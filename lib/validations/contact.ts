import { z } from "zod/mini";

/**
 * Contact form schema. Shared by the client form (react-hook-form resolver)
 * and the API route, so both sides enforce identical rules.
 *
 * Uses `zod/mini` (functional, tree-shakeable API) to keep the client bundle
 * small. Note: `npm run build` uses webpack on purpose; Turbopack (15.5) keeps
 * every zod locale + the JSON Schema converter in the client chunk (~120 kB gz).
 */

export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  message: 2000,
} as const;

export const contactSchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Please enter your name."),
      z.maxLength(CONTACT_LIMITS.name, `Name must be ${CONTACT_LIMITS.name} characters or fewer.`)
    ),
  email: z.pipe(
    z.string().check(z.trim(), z.minLength(1, "Please enter your email.")),
    z
      .email("Please enter a valid email address.")
      .check(
        z.maxLength(CONTACT_LIMITS.email, `Email must be ${CONTACT_LIMITS.email} characters or fewer.`)
      )
  ),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(10, "Message must be at least 10 characters."),
      z.maxLength(
        CONTACT_LIMITS.message,
        `Message must be ${CONTACT_LIMITS.message} characters or fewer.`
      )
    ),
  /** Honeypot: hidden from humans, bots tend to fill it. Must stay empty. */
  company: z.optional(z.string().check(z.maxLength(0))),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
