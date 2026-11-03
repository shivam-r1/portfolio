import { NextResponse } from "next/server";
import { z } from "zod/mini";

import { deliverContactMessage } from "@/lib/contact";
import { contactSchema } from "@/lib/validations/contact";

export const runtime = "nodejs";

/* ---- Best-effort rate limit (per server instance) ---------------------- */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map bounded on long-lived instances
  if (hits.size > 1000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

/* ---- Handler ----------------------------------------------------------- */

const GENERIC_FAILURE =
  "The contact form isn't available right now. Please email me directly instead.";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: bots that fill the hidden field get a quiet "success"
  if (typeof body === "object" && body !== null && "company" in body && body.company) {
    return NextResponse.json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return NextResponse.json(
      { ok: false, error: "Please fix the highlighted fields.", fieldErrors },
      { status: 400 }
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  const { name, email, message } = parsed.data;
  const userAgent = request.headers.get("user-agent") ?? "unknown";

  try {
    const result = await deliverContactMessage({ name, email, message }, { ip, userAgent });
    if (!result.ok) {
      console.error("[contact] delivery failed:", result.reason);
      return NextResponse.json({ ok: false, error: GENERIC_FAILURE }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] delivery threw:", error);
    return NextResponse.json({ ok: false, error: GENERIC_FAILURE }, { status: 502 });
  }
}
