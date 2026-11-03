import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** id for aria-labelledby on the parent section. */
  id: string;
  /** Small mono label above the title, e.g. "Experience". */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex max-w-2xl flex-col gap-3 md:mb-14",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      ) : null}
      <h2
        id={id}
        className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="text-pretty text-base text-muted-foreground sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
