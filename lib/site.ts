import { siteConfig } from "@/lib/data";

/**
 * Canonical site origin (no trailing slash), resolved in this order:
 * 1. NEXT_PUBLIC_SITE_URL (set it on Vercel to the production domain)
 * 2. siteConfig.url from lib/data.ts, once it is no longer a TODO
 * 3. Vercel's system URL for preview deployments
 * 4. localhost for local development
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return stripTrailingSlash(fromEnv);

  if (!siteConfig.url.startsWith("TODO")) return stripTrailingSlash(siteConfig.url);

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercelHost) return `https://${vercelHost}`;

  return "http://localhost:3000";
}

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
