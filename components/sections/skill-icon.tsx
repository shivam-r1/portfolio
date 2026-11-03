import { Braces, Database, Server, Sparkles, Workflow } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import {
  siExpress,
  siGit,
  siGithub,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

import { cn } from "@/lib/utils";

type IconProps = SVGProps<SVGSVGElement>;

/*
 * Maps the `icon` keys used in lib/data.ts skillGroups to an icon.
 * Brand marks come from simple-icons (SVG path only, rendered monochrome);
 * concepts and brands simple-icons does not ship use lucide.
 */
const brandIcons: Record<string, SimpleIcon> = {
  react: siReact,
  nextjs: siNextdotjs,
  typescript: siTypescript,
  javascript: siJavascript,
  tailwindcss: siTailwindcss,
  html: siHtml5,
  nodejs: siNodedotjs,
  nestjs: siNestjs,
  express: siExpress,
  python: siPython,
  gemini: siGooglegemini,
  jwt: siJsonwebtokens,
  postgresql: siPostgresql,
  mongodb: siMongodb,
  git: siGit,
  github: siGithub,
  postman: siPostman,
  vercel: siVercel,
};

const genericIcons: Record<string, ComponentType<IconProps>> = {
  api: Server,
  sqlserver: Database,
  sql: Braces,
  azuredevops: Workflow,
  langfuse: Sparkles,
};

interface SkillIconProps extends IconProps {
  /** Key from Skill.icon in lib/data.ts. */
  name: string;
}

export function SkillIcon({ name, className, ...props }: SkillIconProps) {
  const brand = brandIcons[name];
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className={cn("shrink-0", className)}
        {...props}
      >
        <path d={brand.path} />
      </svg>
    );
  }

  const Generic = genericIcons[name] ?? Braces;
  return <Generic aria-hidden="true" className={cn("shrink-0", className)} {...props} />;
}
