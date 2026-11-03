"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import type { ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/data";
import { CONTACT_LIMITS, contactSchema, type ContactFormValues } from "@/lib/validations/contact";

interface ApiResponse {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof ContactFormValues, string[]>>;
}

const FIELDS = ["name", "email", "message"] as const satisfies readonly (keyof ContactFormValues)[];

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", company: "" },
    mode: "onTouched",
  });

  const messageLength = useWatch({ control, name: "message" })?.length ?? 0;

  const hasEmail = !siteConfig.email.startsWith("TODO");
  const fallbackToast = hasEmail
    ? {
        description: `You can also email me directly at ${siteConfig.email}.`,
        action: {
          label: "Email",
          onClick: () => {
            window.location.href = `mailto:${siteConfig.email}`;
          },
        },
      }
    : { description: "Please try again in a little while." };

  async function onSubmit(values: ContactFormValues) {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await response.json().catch(() => null)) as ApiResponse | null;

      if (response.ok && json?.ok) {
        toast.success("Message sent", { description: "Thanks! I'll get back to you soon." });
        reset();
        return;
      }

      if (json?.fieldErrors) {
        for (const field of FIELDS) {
          const message = json.fieldErrors[field]?.[0];
          if (message) setError(field, { type: "server", message });
        }
      }
      toast.error(json?.error ?? "Couldn't send your message.", fallbackToast);
    } catch {
      toast.error("Network error. Your message wasn't sent.", fallbackToast);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
      {/* Honeypot: visually removed and skipped by screen readers / tab order */}
      <div className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("company")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Name" error={errors.name?.message}>
          <Input
            id="contact-name"
            autoComplete="name"
            placeholder="Your name"
            maxLength={CONTACT_LIMITS.name}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
          />
        </Field>

        <Field id="contact-email" label="Email" error={errors.email?.message}>
          <Input
            id="contact-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={CONTACT_LIMITS.email}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
          />
        </Field>
      </div>

      <Field
        id="contact-message"
        label="Message"
        error={errors.message?.message}
        hint={
          <span className="font-mono tabular-nums" aria-hidden="true">
            {messageLength}/{CONTACT_LIMITS.message}
          </span>
        }
      >
        <Textarea
          id="contact-message"
          rows={6}
          placeholder="Tell me about the role, the project, or what you'd like to build."
          maxLength={CONTACT_LIMITS.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
      </Field>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          I usually reply within a day or two.
        </p>
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
          {isSubmitting ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

/* ---- Field wrapper ------------------------------------------------------ */

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}

function Field({ id, label, error, hint, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
