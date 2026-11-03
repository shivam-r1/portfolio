"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";

import { ProjectCard } from "@/components/sections/project-card";
import type { Project, ProjectCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

interface ProjectsGridProps {
  projects: Project[];
}

/** Filter chips plus an animated, reflowing card grid. */
export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduceMotion = useReducedMotion();

  const filters = useMemo<Filter[]>(() => {
    const categories = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...categories];
  }, [projects]);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {filters.map((item) => {
          const count =
            item === "All" ? projects.length : projects.filter((p) => p.category === item).length;
          const active = item === filter;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item)}
              className={cn(
                "inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              {item}
              <span
                className={cn(
                  "font-mono text-xs",
                  active ? "text-primary-foreground/80" : "text-muted-foreground"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <LayoutGroup>
        <motion.ul layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.li
                key={project.id}
                layout={!reduceMotion}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: reduceMotion ? 0.15 : 0.25, ease: "easeOut" }}
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {projects.length} projects.
      </p>
    </div>
  );
}
