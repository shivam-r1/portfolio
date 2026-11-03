/**
 * Content types for the portfolio.
 * Every piece of copy rendered on the site is described here and
 * populated in lib/data.ts, so components stay free of hard-coded text.
 */

export type SocialPlatform = "github" | "linkedin" | "email" | "leetcode";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** Absolute URL or mailto: link. Placeholders start with `TODO_`. */
  href: string;
}

export interface NavLink {
  label: string;
  /** In-page anchor, e.g. "#projects". */
  href: `#${string}`;
}

export interface ImageAsset {
  /** Path under /public or an absolute URL. */
  src: string;
  alt: string;
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  /** Used for the navbar logo mark. */
  initials: string;
  /** Short professional title, e.g. "Full-Stack Developer". */
  title: string;
  tagline: string;
  /** Meta description / Open Graph description. */
  description: string;
  /** Canonical production URL, no trailing slash. */
  url: string;
  locale: string;
  location: string;
  email: string;
  resumeUrl: string;
  photo: ImageAsset;
  socials: SocialLink[];
  github: {
    username: string;
  };
}

export interface HeroContent {
  greeting: string;
  /** Rotated by the animated role text. */
  roles: string[];
  pitch: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface AboutContent {
  paragraphs: string[];
  facts: QuickFact[];
}

export type EmploymentType = "Internship" | "Full-time" | "Contract";

export interface ExperienceItem {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  type: EmploymentType;
  location: string;
  /** Display strings, e.g. "Aug 2026". */
  start: string;
  end: string | "Present";
  summary: string;
  highlights: string[];
  stack: string[];
}

export type ProjectCategory = "Full Stack" | "AI / LLM" | "Backend" | "Frontend";

/** case-study: professional work without public source; personal: open source. */
export type ProjectKind = "case-study" | "personal";

export interface ProjectLinks {
  github?: string;
  live?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  kind: ProjectKind;
  category: ProjectCategory;
  stack: string[];
  links: ProjectLinks;
  image: ImageAsset;
  featured: boolean;
  role?: string;
  period?: string;
  highlights?: string[];
}

export type SkillGroupName = "Frontend" | "Backend" | "Database" | "Tools";

export interface Skill {
  name: string;
  /** Icon key resolved in components/sections/skills.tsx. */
  icon: string;
}

export interface SkillGroup {
  name: SkillGroupName;
  description: string;
  skills: Skill[];
}

export interface Education {
  institution: string;
  institutionUrl?: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  location: string;
  highlights: string[];
  coursework: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url?: string;
  description?: string;
}

export interface ContactContent {
  heading: string;
  description: string;
  availability: string;
}
