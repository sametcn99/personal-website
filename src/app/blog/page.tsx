import ContentListPage from "@/components/ContentListPage";
import { getBlogPosts } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  openGraph: {
    title: "Blog",
  },
};

export default function BlogPage() {
  // Get blog posts and transform them to match the expected format
  const blogPosts = getBlogPosts().map((post) => ({
    title: post.metadata.title,
    href: `/blog/${post.slug}`,
    publishedAt: post.metadata.publishedAt,
    summary: post.metadata.summary,
    tags: post.metadata.tags || [],
    language: post.metadata.language || "en",
  }));

  return (
    <ContentListPage
      title="Blog Posts"
      description="A collection of my thoughts on development and the passions that keep me inspired."
      posts={blogPosts}
      searchKey="blog"
    />
  );
}
