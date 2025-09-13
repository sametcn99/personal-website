import PageClient from "@/components/PageClient";
import { getBlogPosts, getGistPosts } from "@/lib/content";

export default function Home() {
  // Get gist posts and transform them to match the expected format
  const gistPosts = getGistPosts().map((post) => ({
    title: post.metadata.title,
    href: `/gist/${post.slug}`,
    publishedAt: post.metadata.publishedAt,
    summary: post.metadata.summary,
    tags: post.metadata.tags || [],
    language: post.metadata.language || "en",
  }));

  // Get blog posts and transform them to match the expected format
  const blogPosts = getBlogPosts().map((post) => ({
    title: post.metadata.title,
    href: `/blog/${post.slug}`,
    publishedAt: post.metadata.publishedAt,
    summary: post.metadata.summary,
    tags: post.metadata.tags || [],
    language: post.metadata.language || "en",
  }));

  return <PageClient gistPosts={gistPosts} blogPosts={blogPosts} />;
}
