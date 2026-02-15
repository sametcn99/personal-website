import type { Metadata } from "next";
import ContentListPage from "@/components/ContentListPage";
import { getRepos } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Repositories",
  openGraph: {
    title: "Repositories",
  },
};

export const dynamic = "force-dynamic";

/**
 * Maps a GitHub repository response item into ContentMetadata.
 */
function mapRepoToContentMetadata(repo: {
  name: string;
  description: string | null;
  pushed_at?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  language?: string | null;
  topics?: string[] | null;
}): ContentMetadata {
  const publishedAt =
    repo.pushed_at || repo.updated_at || repo.created_at || "1970-01-01";

  return {
    title: repo.name,
    href: `/repo/${repo.name}`,
    publishedAt,
    summary: repo.description || "GitHub repository",
    tags: repo.topics || [],
    language: repo.language || "en",
  };
}

/**
 * Lists repositories dynamically by fetching fresh data on each request.
 */
export default async function RepoPage() {
  let repos: ContentMetadata[] = [];

  try {
    const response = await getRepos();
    repos = response.data.map(mapRepoToContentMetadata);
  } catch {
    repos = [];
  }

  return (
    <ContentListPage
      title="Repositories"
      description="A live list of my GitHub repositories."
      posts={repos}
      searchKey="repo"
    />
  );
}
