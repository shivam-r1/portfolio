"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

interface RoleRotatorProps {
  roles: string[];
  /** Milliseconds each role stays on screen. */
  interval?: number;
  className?: string;
}

/**
 * Cycles through role titles with a vertical slide and a blinking caret.
 * Screen readers get the full list once instead of a changing live region.
 */
export function RoleRotator({ roles, interval = 2600, className }: RoleRotatorProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (roles.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [roles.length, interval]);

  if (roles.length === 0) return null;

  const current = roles[index] ?? roles[0];

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true" className="inline-grid overflow-hidden py-1 leading-tight">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            className="col-start-1 row-start-1 whitespace-nowrap text-primary"
            initial={reduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: "easeOut" }}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[0.9em] w-[3px] animate-caret-blink rounded-sm bg-primary"
      />
    </span>
  );
}
