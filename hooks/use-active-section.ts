"use client";

import { useEffect, useState } from "react";

/**
 * Scroll spy: returns the id of the section currently in the viewport band.
 * `ids` should be a stable array (module-level constant) to avoid re-observing.
 */
export function useActiveSection(ids: string[], rootMargin = "-35% 0px -60% 0px") {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        // Prefer the section closest to the top of the band
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActive(top.target.id);
      },
      { rootMargin }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return active;
}
