import { Award, GraduationCap, MapPin } from "lucide-react";

import { FadeIn } from "@/components/motion";
import { Section } from "@/components/sections/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { certifications, education } from "@/lib/data";

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education"
      title="Education and certifications"
    >
      <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
        {education.map((item) => (
          <FadeIn key={item.institution}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-background text-primary">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="space-y-1">
                    <CardTitle className="text-lg leading-snug">
                      {item.degree} in {item.field}
                    </CardTitle>
                    <CardDescription>
                      {item.institutionUrl ? (
                        <a
                          href={item.institutionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-foreground underline-offset-4 hover:underline"
                        >
                          {item.institution}
                        </a>
                      ) : (
                        <span className="text-foreground">{item.institution}</span>
                      )}
                    </CardDescription>
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                      <span className="font-mono">
                        {item.start} – {item.end}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {item.location}
                      </span>
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {item.highlights.length > 0 ? (
                  <ul className="space-y-1.5">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 text-sm sm:text-base">
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Coursework
                  </h4>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {item.coursework.map((course) => (
                      <li key={course}>
                        <Badge variant="outline" className="font-normal">
                          {course}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}

        <FadeIn delay={0.08}>
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-background text-primary">
                  <Award className="h-5 w-5" aria-hidden="true" />
                </span>
                <CardTitle className="text-lg">Certifications</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {certifications.map((cert) => (
                  <li key={cert.name} className="space-y-1">
                    <p className="font-medium leading-snug">
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-4 hover:underline"
                        >
                          {cert.name}
                        </a>
                      ) : (
                        cert.name
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer} <span aria-hidden="true">·</span>{" "}
                      <span className="font-mono">{cert.year}</span>
                    </p>
                    {cert.description ? (
                      <p className="text-sm text-muted-foreground">{cert.description}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </Section>
  );
}
