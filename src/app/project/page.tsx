import ContentListPage from "@/components/ContentListPage";
import { getProjectPosts } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  openGraph: {
    title: "Projects",
  },
};

export default function ProjectPage() {
  // Get project posts and transform them to match the expected format
  const projectPosts = getProjectPosts().map((post) => ({
    title: post.metadata.title,
    href: `/project/${post.slug}`,
    publishedAt: post.metadata.publishedAt,
    summary: post.metadata.summary,
    tags: post.metadata.tags || [],
    language: post.metadata.language || "en",
  }));

  return (
    <ContentListPage
      title="Projects"
      description="A showcase of my personal projects and contributions to the developer community."
      posts={projectPosts}
      searchKey="project"
    />
  );
}
