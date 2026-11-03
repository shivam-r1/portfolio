import { FadeIn } from "@/components/motion";
import { Section } from "@/components/sections/section";
import { SkillIcon } from "@/components/sections/skill-icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I reach for"
      description="The stack I use day to day, grouped by where it lives."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, index) => (
          <FadeIn key={group.name} delay={index * 0.06}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base">{group.name}</CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="inline-flex items-center gap-2 rounded-md border bg-background px-2.5 py-1.5 text-sm transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      <SkillIcon name={skill.icon} className="h-4 w-4" />
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
