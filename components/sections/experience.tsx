import { MapPin } from "lucide-react";

import { FadeIn } from "@/components/motion";
import { Section } from "@/components/sections/section";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I have worked"
      description="Internships where I owned real features in production."
    >
      <ol className="relative border-l border-border/80 pl-8 sm:pl-10">
        {experience.map((item, index) => (
          <li key={item.id} className="relative pb-12 last:pb-0">
            {/* Timeline marker */}
            <span
              aria-hidden="true"
              className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background sm:-left-[calc(2.5rem+5px)]"
            />

            <FadeIn delay={index * 0.05}>
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
                    {item.role}{" "}
                    <span className="text-muted-foreground">·</span>{" "}
                    {item.companyUrl ? (
                      <a
                        href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        {item.company}
                      </a>
                    ) : (
                      <span className="text-primary">{item.company}</span>
                    )}
                  </h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                    <span className="font-mono">
                      {item.start} – {item.end}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.location}
                    </span>
                  </p>
                </div>
                <Badge variant="accent">{item.type}</Badge>
              </div>

              <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">{item.summary}</p>

              <ul className="mt-4 max-w-2xl space-y-2.5">
                {item.highlights.map((highlight) => (
                  <li key={highlight.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed sm:text-base">
                    <span
                      aria-hidden="true"
                      className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span className="text-pretty">{highlight}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                {item.stack.map((tech) => (
                  <li key={tech}>
                    <Badge variant="outline" className="font-mono font-normal">
                      {tech}
                    </Badge>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </li>
        ))}
      </ol>
    </Section>
  );
}
