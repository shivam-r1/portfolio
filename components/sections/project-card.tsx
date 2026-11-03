import Image from "next/image";
import { ExternalLink, Lock } from "lucide-react";

import { GitHubIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  /** Load the image eagerly for above-the-fold cards. */
  priority?: boolean;
}

/** A link is shown only once its TODO_ placeholder has been replaced in lib/data.ts. */
const isReady = (href?: string): href is string => Boolean(href) && !href!.startsWith("TODO");

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const github = isReady(project.links.github) ? project.links.github : null;
  const live = isReady(project.links.live) ? project.links.live : null;
  const hasLinks = github !== null || live !== null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-colors hover:border-primary/50">
      <div className="relative aspect-video overflow-hidden border-b bg-muted">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant={project.kind === "case-study" ? "accent" : "secondary"}>
            {project.kind === "case-study" ? "Case study" : "Open source"}
          </Badge>
          {project.featured ? <Badge>Featured</Badge> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
          <p className="text-sm text-muted-foreground">{project.tagline}</p>
        </div>

        {project.role || project.period ? (
          <p className="font-mono text-xs text-muted-foreground">
            {[project.role, project.period].filter(Boolean).join(" · ")}
          </p>
        ) : null}

        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge variant="outline" className="font-mono font-normal">
                {tech}
              </Badge>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {github ? (
            <Button asChild variant="outline" size="sm">
              <a href={github} target="_blank" rel="noopener noreferrer">
                <GitHubIcon />
                Code
              </a>
            </Button>
          ) : null}
          {live ? (
            <Button asChild size="sm">
              <a href={live} target="_blank" rel="noopener noreferrer">
                <ExternalLink />
                Live demo
              </a>
            </Button>
          ) : null}
          {!hasLinks ? (
            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              {project.kind === "case-study" ? "Proprietary work, no public source" : "Links coming soon"}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
