"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Menu } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/use-active-section";
import { navLinks, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Observed ids: hero first so nothing is highlighted while it is in view. */
const observedIds = ["hero", ...navLinks.map((link) => link.href.slice(1))];

export function Navbar() {
  const active = useActiveSection(observedIds);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between gap-4" aria-label="Primary">
        {/* Logo */}
        <a
          href="#hero"
          title="Back to top"
          className="group flex items-center gap-2.5 rounded-md"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card font-mono text-sm font-semibold text-primary transition-colors group-hover:border-primary/60">
            {siteConfig.initials}
          </span>
          <span className="sr-only text-sm font-medium lg:not-sr-only">{siteConfig.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <li key={id} className="relative">
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-md bg-accent"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 32 }
                    }
                  />
                ) : null}
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative z-10 inline-flex h-8 items-center rounded-md px-3 text-sm font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">
              <Download />
              Resume
            </a>
          </Button>

          {/* Mobile drawer */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col sm:max-w-xs">
              <SheetHeader className="text-left">
                <SheetTitle className="font-mono text-sm text-primary">{siteConfig.initials}</SheetTitle>
                <SheetDescription>{siteConfig.tagline}</SheetDescription>
              </SheetHeader>
              <ul className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => {
                  const id = link.href.slice(1);
                  const isActive = active === id;
                  return (
                    <li key={id}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "location" : undefined}
                        className={cn(
                          "flex h-11 items-center rounded-md px-3 text-base font-medium transition-colors",
                          isActive
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-4">
                <Button asChild variant="outline" className="flex-1">
                  <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer">
                    <Download />
                    Resume
                  </a>
                </Button>
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
