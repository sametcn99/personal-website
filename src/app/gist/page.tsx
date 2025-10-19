import type { Metadata } from "next";
import ContentListPage from "@/components/ContentListPage";
import { getGistPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Technical Gists",
  openGraph: {
    title: "Technical Gists",
  },
};

export default function GistPage() {
  // Get gist posts and transform them to match the expected format
  const gistPosts = getGistPosts().map((post) => ({
    title: post.metadata.title,
    href: `/gist/${post.slug}`,
    publishedAt: post.metadata.publishedAt,
    summary: post.metadata.summary,
    tags: post.metadata.tags || [],
    language: post.metadata.language || "en",
  }));

  return (
    <ContentListPage
      title="Technical Gists"
      description="Code snippets, tutorials, and technical documentation."
      posts={gistPosts}
      searchKey="gist"
    />
  );
}
