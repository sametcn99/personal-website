import { getGistPosts } from "@/lib/content";
import PageClient from "@/components/PageClient";

export default function Home() {
  // Get gist posts and transform them to match the expected format
  const gistPosts = getGistPosts().map((post) => ({
    title: post.metadata.title,
    href: `/gist/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  return <PageClient gistPosts={gistPosts} />;
}
