import type { ContributionDay } from "@/lib/github";
import { cn } from "@/lib/utils";

interface ContributionCalendarProps {
  weeks: ContributionDay[][];
  total: number;
}

const CELL = 11; // px
const GAP = 3; // px

/** Accent-tinted equivalents of GitHub's five contribution levels. */
const levelClass: Record<ContributionDay["level"], string> = {
  0: "bg-muted",
  1: "bg-primary/30",
  2: "bg-primary/50",
  3: "bg-primary/75",
  4: "bg-primary",
};

const monthFormatter = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });
const dayFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * GitHub-style contribution heatmap: 7 rows (Sun–Sat) by ~53 week columns.
 * Pure server markup; scrolls horizontally on narrow screens.
 */
export function ContributionCalendar({ weeks, total }: ContributionCalendarProps) {
  // Month labels: one per month at the week it first appears
  const months: { label: string; column: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, index) => {
    const first = week[0];
    if (!first) return;
    const month = new Date(first.date).getUTCMonth();
    if (month !== lastMonth) {
      months.push({ label: monthFormatter.format(new Date(first.date)), column: index + 1 });
      lastMonth = month;
    }
  });

  // The first week may start mid-week; pad it so weekdays line up
  const leadingPad = weeks[0] ? 7 - weeks[0].length : 0;
  const columns = `repeat(${weeks.length}, ${CELL}px)`;

  return (
    <div>
      <p className="sr-only">{total} contributions in the last year.</p>
      <div className="overflow-x-auto pb-2">
        <div className="inline-block min-w-full" aria-hidden="true">
          <div
            className="grid font-mono text-[10px] leading-none text-muted-foreground"
            style={{ gridTemplateColumns: columns, columnGap: GAP }}
          >
            {months.map((month) => (
              <span
                key={`${month.label}-${month.column}`}
                className="mb-1.5"
                style={{ gridColumnStart: month.column }}
              >
                {month.label}
              </span>
            ))}
          </div>

          <div
            className="grid grid-flow-col grid-rows-7"
            style={{ gridTemplateColumns: columns, gap: GAP }}
          >
            {Array.from({ length: leadingPad }).map((_, i) => (
              <span key={`pad-${i}`} style={{ width: CELL, height: CELL }} />
            ))}
            {weeks.flat().map((day) => (
              <span
                key={day.date}
                title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${dayFormatter.format(new Date(day.date))}`}
                className={cn("rounded-[2px]", levelClass[day.level])}
                style={{ width: CELL, height: CELL }}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className="mt-2 flex items-center justify-end gap-1 font-mono text-[10px] text-muted-foreground"
        aria-hidden="true"
      >
        <span className="mr-1">Less</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <span
            key={level}
            className={cn("rounded-[2px]", levelClass[level])}
            style={{ width: CELL, height: CELL }}
          />
        ))}
        <span className="ml-1">More</span>
      </div>
    </div>
  );
}
