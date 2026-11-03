import type { ContactFormValues } from "@/lib/validations/contact";

/**
 * Server-only delivery for contact-form submissions.
 *
 * - With RESEND_API_KEY + CONTACT_TO_EMAIL set, the message is emailed via the
 *   Resend REST API (plain fetch, no SDK dependency).
 * - Without them, development logs the message to the terminal so the form can
 *   be exercised locally; production reports "not configured" so the UI can
 *   point visitors to the direct email address instead of silently dropping mail.
 */

export type ContactMessage = Pick<ContactFormValues, "name" | "email" | "message">;

export interface DeliveryMeta {
  ip: string;
  userAgent: string;
}

export type DeliveryResult =
  | { ok: true; channel: "email" | "log" }
  | { ok: false; reason: string };

const RESEND_ENDPOINT = "https://api.resend.com/emails";
/** Resend's shared sender; it can only deliver to the account owner's address. */
const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>";

export async function deliverContactMessage(
  message: ContactMessage,
  meta: DeliveryMeta
): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (apiKey && to) {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
        to: [to],
        reply_to: message.email,
        subject: `Portfolio contact from ${message.name}`,
        text: formatPlainText(message, meta),
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = (await response.text().catch(() => "")).slice(0, 200);
      return {
        ok: false,
        reason: `Email provider responded ${response.status}${detail ? `: ${detail}` : ""}`,
      };
    }
    return { ok: true, channel: "email" };
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(
      "[contact] No email provider configured; message logged instead.\n" +
        formatPlainText(message, meta)
    );
    return { ok: true, channel: "log" };
  }

  return {
    ok: false,
    reason: "No email provider configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL.",
  };
}

function formatPlainText(message: ContactMessage, meta: DeliveryMeta): string {
  return [
    `Name:  ${message.name}`,
    `Email: ${message.email}`,
    "",
    message.message,
    "",
    "—",
    `IP: ${meta.ip}`,
    `User agent: ${meta.userAgent}`,
    `Received: ${new Date().toISOString()}`,
  ].join("\n");
}
