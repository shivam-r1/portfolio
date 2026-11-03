import Image from "next/image";

import { FadeIn } from "@/components/motion";
import { Section } from "@/components/sections/section";
import { about, siteConfig } from "@/lib/data";

/** True once a real photo path replaces the TODO placeholder in lib/data.ts. */
const hasPhoto = !siteConfig.photo.src.startsWith("TODO");

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A developer who ships end to end"
      description="From the first schema to the last pixel."
    >
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:gap-14 lg:grid-cols-[minmax(0,1fr)_320px]">
        <FadeIn className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-pretty">
              {paragraph}
            </p>
          ))}

          <dl className="grid gap-x-6 gap-y-4 pt-4 sm:grid-cols-2">
            {about.facts.map((fact) => (
              <div key={fact.label} className="border-l-2 border-primary/40 pl-3">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="mt-0.5 text-sm font-medium text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn delay={0.1} className="order-first md:order-last">
          <div className="relative mx-auto aspect-square w-56 overflow-hidden rounded-2xl border bg-card shadow-sm md:w-full">
            {hasPhoto ? (
              <Image
                src={siteConfig.photo.src}
                alt={siteConfig.photo.alt}
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 224px"
                className="object-cover"
              />
            ) : (
              /* Placeholder until a photo is added to siteConfig.photo */
              <div
                role="img"
                aria-label={siteConfig.photo.alt}
                className="flex h-full w-full items-center justify-center bg-grid"
              >
                <span className="font-mono text-5xl font-semibold text-primary">
                  {siteConfig.initials}
                </span>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
