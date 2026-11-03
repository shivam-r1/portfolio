"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  /** Seconds to wait before starting. */
  delay?: number;
  /** Animate on mount (hero) instead of when scrolled into view. */
  onMount?: boolean;
  /** Vertical travel in px; ignored when the user prefers reduced motion. */
  y?: number;
}

/**
 * Fade-and-rise reveal used for scroll animations across the page.
 * Honours prefers-reduced-motion by dropping the transform and keeping
 * only a short opacity fade.
 */
export function FadeIn({
  children,
  delay = 0,
  onMount = false,
  y = 16,
  ...props
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  const hidden = reduceMotion ? { opacity: 0 } : { opacity: 0, y };
  const visible = reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={hidden}
      {...(onMount
        ? { animate: visible }
        : { whileInView: visible, viewport: { once: true, margin: "-80px" } })}
      transition={{ duration: reduceMotion ? 0.2 : 0.5, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
