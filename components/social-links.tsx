import { SocialIcon } from "@/components/icons";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
  /** Icon button size. */
  size?: "sm" | "md";
}

/** Row of icon links to the profiles listed in siteConfig.socials. */
export function SocialLinks({ className, size = "md" }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-1", className)} aria-label="Social links">
      {siteConfig.socials.map((social) => {
        const external = !social.href.startsWith("mailto:");
        return (
          <li key={social.platform}>
            <a
              href={social.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-label={social.label}
              title={social.label}
              className={cn(
                "inline-flex items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                size === "sm" ? "h-8 w-8" : "h-10 w-10"
              )}
            >
              <SocialIcon
                platform={social.platform}
                className={size === "sm" ? "h-4 w-4" : "h-5 w-5"}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
