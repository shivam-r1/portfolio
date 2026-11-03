import { ArrowRight, ChevronDown } from "lucide-react";

import { RoleRotator } from "@/components/sections/role-rotator";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import { hero, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Above-the-fold reveal is pure CSS (tailwindcss-animate) rather than the
 * framer-motion FadeIn used elsewhere: it starts on first paint instead of
 * waiting for hydration, which keeps the hero text eligible as LCP early.
 * prefers-reduced-motion collapses it to an instant show (see globals.css).
 */
const reveal = "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 ease-out";
/** Largest text blocks (LCP candidates) slide only: they must be visible on first paint. */
const revealLcp = "animate-in slide-in-from-bottom-2 fill-mode-both duration-500 ease-out";

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden"
    >
      {/* Decorative background: dotted grid plus a soft accent glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10rem] -z-10 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="container py-20 md:py-28">
        <div className="max-w-3xl">
          <p className={cn(reveal, "font-mono text-sm text-primary")}>{hero.greeting}</p>

          <h1
            className={cn(
              revealLcp,
              "mt-3 text-balance text-4xl font-semibold tracking-tight delay-[80ms] sm:text-5xl md:text-6xl lg:text-7xl"
            )}
          >
            {siteConfig.name}
          </h1>

          <p
            className={cn(
              reveal,
              "mt-4 text-2xl font-medium tracking-tight text-muted-foreground delay-[160ms] sm:text-3xl md:text-4xl"
            )}
          >
            <RoleRotator roles={hero.roles} />
          </p>

          <div className={cn(revealLcp, "delay-[240ms]")}>
            <p className="mt-6 text-lg font-medium text-foreground sm:text-xl">
              {siteConfig.tagline}
            </p>
            <p className="mt-3 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
              {hero.pitch}
            </p>
          </div>

          <div className={cn(reveal, "mt-8 flex flex-wrap items-center gap-3 delay-[320ms]")}>
            <Button asChild size="lg">
              <a href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
            </Button>
          </div>

          <div className={cn(reveal, "mt-8 delay-[400ms]")}>
            <SocialLinks className="-ml-2" />
          </div>
        </div>
      </div>

      {/* Scroll hint, desktop only */}
      <a
        href="#about"
        aria-label="Scroll to the About section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground md:flex"
      >
        Scroll
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
