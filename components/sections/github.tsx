import { Activity, FolderGit2, Star, Users } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { GitHubIcon } from "@/components/icons";
import { FadeIn } from "@/components/motion";
import { ContributionCalendar } from "@/components/sections/contribution-calendar";
import { RepoCard } from "@/components/sections/repo-card";
import { Section } from "@/components/sections/section";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/data";
import { getGitHubData, type GitHubData, type GitHubResult } from "@/lib/github";

/** Async server component: fetches on the server, cached by ISR (see app/page.tsx). */
export async function GitHub() {
  const result = await getGitHubData();

  return (
    <Section
      id="github"
      eyebrow="GitHub"
      title="Open-source activity"
      description="Pulled live from my GitHub profile and refreshed every hour."
    >
      {result.status === "ok" ? (
        <GitHubActivity data={result.data} />
      ) : (
        <Fallback result={result} />
      )}
    </Section>
  );
}

/* ---- Happy path ------------------------------------------------------- */

interface StatTile {
  label: string;
  value: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

function GitHubActivity({ data }: { data: GitHubData }) {
  const stats: StatTile[] = [
    { label: "Contributions (year)", value: data.contributions.total, icon: Activity },
    { label: "Public repos", value: data.profile.publicRepos, icon: FolderGit2 },
    { label: "Stars earned", value: data.profile.totalStars, icon: Star },
    { label: "Followers", value: data.profile.followers, icon: Users },
  ];

  return (
    <div className="space-y-8">
      <FadeIn>
        <dl className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-4 shadow-sm sm:p-5">
              <dt className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                <stat.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                {stat.label}
              </dt>
              <dd className="mt-2 font-mono text-2xl font-semibold tracking-tight sm:text-3xl">
                {stat.value.toLocaleString("en")}
              </dd>
            </div>
          ))}
        </dl>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="rounded-xl border bg-card p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold">Contributions in the last year</h3>
            <a
              href={data.profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              <GitHubIcon className="h-4 w-4" />@{data.profile.login}
            </a>
          </div>
          <ContributionCalendar weeks={data.contributions.weeks} total={data.contributions.total} />
        </div>
      </FadeIn>

      {data.repos.length > 0 ? (
        <FadeIn delay={0.1}>
          <h3 className="mb-4 text-sm font-semibold">
            {data.repoSource === "pinned" ? "Pinned repositories" : "Top repositories"}
          </h3>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.repos.map((repo) => (
              <li key={repo.url}>
                <RepoCard repo={repo} />
              </li>
            ))}
          </ul>
        </FadeIn>
      ) : null}
    </div>
  );
}

/* ---- Fallback --------------------------------------------------------- */

function Fallback({ result }: { result: Exclude<GitHubResult, { status: "ok" }> }) {
  const username = siteConfig.github.username;
  const profileUrl = username.startsWith("TODO") ? null : `https://github.com/${username}`;
  const showReason = process.env.NODE_ENV !== "production";

  return (
    <FadeIn>
      <div className="flex flex-col items-start gap-4 rounded-xl border border-dashed bg-card/50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border bg-background text-primary">
            <GitHubIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-medium">GitHub activity is unavailable right now.</p>
            <p className="text-sm text-muted-foreground">
              Stats, pinned repos and the contribution graph will appear here once the connection
              is back.
            </p>
            {showReason ? (
              <p className="mt-2 font-mono text-xs text-muted-foreground">
                dev only · {result.status}: {result.reason}
              </p>
            ) : null}
          </div>
        </div>
        {profileUrl ? (
          <Button asChild variant="outline">
            <a href={profileUrl} target="_blank" rel="noopener noreferrer">
              <GitHubIcon />
              View profile
            </a>
          </Button>
        ) : null}
      </div>
    </FadeIn>
  );
}
