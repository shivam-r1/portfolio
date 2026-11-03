import { SocialLinks } from "@/components/social-links";
import { siteConfig } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>
          &copy; {year} {siteConfig.name}. Built with Next.js and Tailwind CSS.
        </p>
        <SocialLinks size="sm" />
      </div>
    </footer>
  );
}
