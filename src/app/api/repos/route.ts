import { NextResponse } from "next/server";
import { getRepos } from "@/lib/utils";

interface GitHubRepoItem {
  name: string;
  description: string | null;
  pushed_at?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  language?: string | null;
  topics?: string[] | null;
}

/**
 * Maps a GitHub repository item to ContentMetadata.
 */
function mapRepoToContentMetadata(repo: GitHubRepoItem): ContentMetadata {
  const publishedAt =
    repo.pushed_at || repo.updated_at || repo.created_at || "1970-01-01";

  return {
    title: repo.name,
    href: `/repo/${repo.name}`,
    publishedAt,
    createdAt: repo.created_at || undefined,
    updatedAt: repo.updated_at || undefined,
    summary: repo.description || "GitHub repository",
    tags: repo.topics || [],
    language: repo.language || "en",
  };
}

export async function GET() {
  try {
    const response = await getRepos();
    const repos = response.data.map(mapRepoToContentMetadata);

    return NextResponse.json({ repos, total: repos.length });
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 },
    );
  }
}
