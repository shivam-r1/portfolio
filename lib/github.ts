import { graphql } from "@octokit/graphql";

import { siteConfig } from "@/lib/data";

/*
 * Server-only GitHub data for the "GitHub activity" section.
 * Only ever import this from server components or route handlers:
 * it reads GITHUB_TOKEN, which must never reach the client bundle.
 */

/** How long (seconds) a GitHub response is reused before refetching. */
export const GITHUB_REVALIDATE_SECONDS = 3600;

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: { name: string; color: string | null } | null;
  topics: string[];
}

export interface ContributionDay {
  date: string;
  count: number;
  /** 0 = none … 4 = most, matching GitHub's quartiles. */
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubData {
  profile: {
    login: string;
    name: string | null;
    url: string;
    avatarUrl: string;
    followers: number;
    publicRepos: number;
    totalStars: number;
  };
  contributions: {
    total: number;
    weeks: ContributionDay[][];
  };
  repos: GitHubRepo[];
  /** "pinned" when the profile has pinned repos, otherwise "top" by stars. */
  repoSource: "pinned" | "top";
}

export type GitHubResult =
  | { status: "ok"; data: GitHubData }
  | { status: "unconfigured"; reason: string }
  | { status: "error"; reason: string };

/* ---- GraphQL ---------------------------------------------------------- */

const QUERY = /* GraphQL */ `
  query PortfolioGitHub($login: String!) {
    user(login: $login) {
      login
      name
      url
      avatarUrl
      followers {
        totalCount
      }
      allRepos: repositories(
        privacy: PUBLIC
        ownerAffiliations: OWNER
        first: 100
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        totalCount
        nodes {
          stargazerCount
        }
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            ...RepoFields
          }
        }
      }
      topRepos: repositories(
        privacy: PUBLIC
        ownerAffiliations: OWNER
        isFork: false
        first: 6
        orderBy: { field: STARGAZERS, direction: DESC }
      ) {
        nodes {
          ...RepoFields
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }

  fragment RepoFields on Repository {
    name
    description
    url
    stargazerCount
    forkCount
    primaryLanguage {
      name
      color
    }
    repositoryTopics(first: 4) {
      nodes {
        topic {
          name
        }
      }
    }
  }
`;

type ContributionLevel =
  | "NONE"
  | "FIRST_QUARTILE"
  | "SECOND_QUARTILE"
  | "THIRD_QUARTILE"
  | "FOURTH_QUARTILE";

interface RepoNode {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string | null } | null;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
}

interface QueryResult {
  user: {
    login: string;
    name: string | null;
    url: string;
    avatarUrl: string;
    followers: { totalCount: number };
    allRepos: { totalCount: number; nodes: { stargazerCount: number }[] };
    pinnedItems: { nodes: Partial<RepoNode>[] };
    topRepos: { nodes: RepoNode[] };
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: {
          contributionDays: {
            date: string;
            contributionCount: number;
            contributionLevel: ContributionLevel;
          }[];
        }[];
      };
    };
  } | null;
}

const LEVELS: Record<ContributionLevel, ContributionDay["level"]> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

function toRepo(node: RepoNode): GitHubRepo {
  return {
    name: node.name,
    description: node.description,
    url: node.url,
    stars: node.stargazerCount,
    forks: node.forkCount,
    language: node.primaryLanguage,
    topics: node.repositoryTopics.nodes.map((n) => n.topic.name),
  };
}

/* ---- Public API ------------------------------------------------------- */

/**
 * Fetches profile stats, repos and the contribution calendar.
 * Never throws: a missing token/username or an API failure returns a
 * non-ok status so the section can render a fallback.
 */
export async function getGitHubData(): Promise<GitHubResult> {
  const login = siteConfig.github.username;
  const token = process.env.GITHUB_TOKEN;

  if (!login || login.startsWith("TODO")) {
    return { status: "unconfigured", reason: "Set siteConfig.github.username in lib/data.ts." };
  }
  if (!token) {
    return { status: "unconfigured", reason: "Add GITHUB_TOKEN to .env.local." };
  }

  try {
    const client = graphql.defaults({
      headers: { authorization: `token ${token}` },
      request: {
        // Route through Next's fetch so the response is cached and revalidated (ISR)
        fetch: (url: RequestInfo | URL, init?: RequestInit) =>
          fetch(url, { ...init, next: { revalidate: GITHUB_REVALIDATE_SECONDS } }),
      },
    });

    const result = await client<QueryResult>(QUERY, { login });
    const user = result.user;
    if (!user) {
      return { status: "error", reason: `GitHub user "${login}" was not found.` };
    }

    const pinned = user.pinnedItems.nodes.filter((n): n is RepoNode => Boolean(n.name));
    const repos = (pinned.length > 0 ? pinned : user.topRepos.nodes).map(toRepo);

    return {
      status: "ok",
      data: {
        profile: {
          login: user.login,
          name: user.name,
          url: user.url,
          avatarUrl: user.avatarUrl,
          followers: user.followers.totalCount,
          publicRepos: user.allRepos.totalCount,
          totalStars: user.allRepos.nodes.reduce((sum, r) => sum + r.stargazerCount, 0),
        },
        contributions: {
          total: user.contributionsCollection.contributionCalendar.totalContributions,
          weeks: user.contributionsCollection.contributionCalendar.weeks.map((week) =>
            week.contributionDays.map((day) => ({
              date: day.date,
              count: day.contributionCount,
              level: LEVELS[day.contributionLevel] ?? 0,
            }))
          ),
        },
        repos,
        repoSource: pinned.length > 0 ? "pinned" : "top",
      },
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    if (process.env.NODE_ENV !== "production") {
      console.warn("[github] fetch failed:", reason);
    }
    return { status: "error", reason };
  }
}
