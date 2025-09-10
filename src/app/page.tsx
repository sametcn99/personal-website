import PageClient from "@/components/PageClient";
import { getBlogPosts, getGistPosts } from "@/lib/content";

export default function Home() {
  // Get gist posts and transform them to match the expected format
  const gistPosts = getGistPosts().map((post) => ({
    title: post.metadata.title,
    href: `/gist/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  // Get blog posts and transform them to match the expected format
  const blogPosts = getBlogPosts().map((post) => ({
    title: post.metadata.title,
    href: `/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    tags: post.metadata.tags || [],
    language: post.metadata.language || "en",
  }));

  return <PageClient gistPosts={gistPosts} blogPosts={blogPosts} />;
}
