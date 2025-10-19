import HomePage from "@/components/home/HomePage";
import { getBlogPosts, getGistPosts, getProjectPosts } from "@/lib/content";

export default function Home() {
  // Get all posts server-side and limit to 5 for homepage
  const allBlogPosts = getBlogPosts();
  const allProjectPosts = getProjectPosts();
  const allGistPosts = getGistPosts();

  // Transform and limit to 5 posts for each section
  const blogPosts = allBlogPosts
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    )
    .slice(0, 5)
    .map((post) => ({
      title: post.metadata.title,
      href: `/blog/${post.slug}`,
      publishedAt: post.metadata.publishedAt,
      summary: post.metadata.summary,
      tags: post.metadata.tags || [],
      language: post.metadata.language || "en",
    }));

  const projectPosts = allProjectPosts
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    )
    .slice(0, 5)
    .map((post) => ({
      title: post.metadata.title,
      href: `/project/${post.slug}`,
      publishedAt: post.metadata.publishedAt,
      summary: post.metadata.summary,
      tags: post.metadata.tags || [],
      language: post.metadata.language || "en",
    }));

  const gistPosts = allGistPosts
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    )
    .slice(0, 5)
    .map((post) => ({
      title: post.metadata.title,
      href: `/gist/${post.slug}`,
      publishedAt: post.metadata.publishedAt,
      summary: post.metadata.summary,
      tags: post.metadata.tags || [],
      language: post.metadata.language || "en",
    }));

  return (
    <HomePage
      blogPosts={blogPosts}
      projectPosts={projectPosts}
      gistPosts={gistPosts}
      blogTotal={allBlogPosts.length}
      projectTotal={allProjectPosts.length}
      gistTotal={allGistPosts.length}
    />
  );
}
