import { GitFork, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { GitHubRepo } from "@/lib/github";

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <h3 className="font-mono text-sm font-semibold text-foreground group-hover:text-primary">
        {repo.name}
      </h3>
      <p className="line-clamp-2 text-sm text-muted-foreground">
        {repo.description ?? "No description yet."}
      </p>

      {repo.topics.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5" aria-label="Topics">
          {repo.topics.map((topic) => (
            <li key={topic}>
              <Badge variant="secondary" className="font-normal">
                {topic}
              </Badge>
            </li>
          ))}
        </ul>
      ) : null}

      <dl className="mt-auto flex items-center gap-4 pt-1 text-xs text-muted-foreground">
        {repo.language ? (
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Language</dt>
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full border border-black/10"
              style={{ backgroundColor: repo.language.color ?? "currentColor" }}
            />
            <dd>{repo.language.name}</dd>
          </div>
        ) : null}
        <div className="flex items-center gap-1">
          <dt className="sr-only">Stars</dt>
          <Star className="h-3.5 w-3.5" aria-hidden="true" />
          <dd>{repo.stars}</dd>
        </div>
        <div className="flex items-center gap-1">
          <dt className="sr-only">Forks</dt>
          <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
          <dd>{repo.forks}</dd>
        </div>
      </dl>
    </a>
  );
}
