import { FadeIn } from "@/components/motion";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { Section } from "@/components/sections/section";
import { projects } from "@/lib/data";

/** Featured work first, then the rest in data order. */
const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I have built"
      description="Production work at Infinity Assurance as case studies, plus open-source side projects."
    >
      <FadeIn>
        <ProjectsGrid projects={ordered} />
      </FadeIn>
    </Section>
  );
}
