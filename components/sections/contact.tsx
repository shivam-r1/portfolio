import { Mail, MapPin } from "lucide-react";

import { FadeIn } from "@/components/motion";
import { ContactForm } from "@/components/sections/contact-form";
import { Section } from "@/components/sections/section";
import { SocialLinks } from "@/components/social-links";
import { Badge } from "@/components/ui/badge";
import { contact, siteConfig } from "@/lib/data";

export function Contact() {
  const hasEmail = !siteConfig.email.startsWith("TODO");

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={contact.heading}
      description={contact.description}
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <FadeIn>
          <div className="space-y-6">
            <Badge variant="accent" className="gap-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" aria-hidden="true" />
              {contact.availability}
            </Badge>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {hasEmail ? (
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="underline-offset-4 hover:text-primary hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                ) : (
                  <span className="text-muted-foreground">Email address coming soon</span>
                )}
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{siteConfig.location}</span>
              </li>
            </ul>

            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Elsewhere
              </p>
              <SocialLinks className="-ml-2" />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
