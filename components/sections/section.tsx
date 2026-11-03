import type { ReactNode } from "react";

import { SectionHeading } from "@/components/sections/section-heading";
import { cn } from "@/lib/utils";

interface SectionProps {
  /** Anchor id, matched by navLinks hrefs in lib/data.ts. */
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children: ReactNode;
}

/**
 * Standard page section: consistent vertical rhythm, container width,
 * scroll offset for the sticky navbar and an accessible heading.
 */
export function Section({
  id,
  eyebrow,
  title,
  description,
  align,
  className,
  children,
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-20 py-20 md:py-28", className)}
    >
      <div className="container">
        <SectionHeading
          id={headingId}
          eyebrow={eyebrow}
          title={title}
          description={description}
          align={align}
        />
        {children}
      </div>
    </section>
  );
}
