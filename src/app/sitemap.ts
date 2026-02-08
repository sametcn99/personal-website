import type { MetadataRoute } from "next";
import { getGistPosts } from "@/app/gist/utils";
import { getBlogPosts, getProjectPosts } from "@/lib/content";
import { socialMediaLinks } from "@/lib/social";
import { getRepos } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://sametcc.me"; // Replace with your actual domain

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/project`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gist`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/rss`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/readme`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
  ];

  // Dynamic gist pages
  const gistPosts = getGistPosts();
  const gistPages = gistPosts.flatMap((post) => [
    {
      url: `${baseUrl}/gist/${post.slug}`,
      lastModified: new Date(post.metadata.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/gist/${post.slug}/raw`,
      lastModified: new Date(post.metadata.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ]);

  const blogPosts = getBlogPosts();
  const blogPages = blogPosts.flatMap((post) => [
    {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.metadata.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/${post.slug}/raw`,
      lastModified: new Date(post.metadata.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ]);

  const projectPosts = getProjectPosts();
  const projectPages = projectPosts.flatMap((post) => [
    {
      url: `${baseUrl}/project/${post.slug}`,
      lastModified: new Date(post.metadata.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/project/${post.slug}/raw`,
      lastModified: new Date(post.metadata.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ]);

  // Link pages (Static)
  const linkPages = socialMediaLinks.flatMap((link) =>
    link.type.map((slug) => ({
      url: `${baseUrl}/link/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  );

  // Repo pages (Dynamic)
  let repoPages: MetadataRoute.Sitemap = [];
  try {
    const { data: repos } = await getRepos();
    repoPages = repos.map((repo) => ({
      url: `${baseUrl}/repo/${repo.name}`,
      lastModified: new Date(repo.updated_at ?? new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.warn("Failed to fetch repos for sitemap", error);
  }

  // Combine all pages
  const allPages = [
    ...staticPages,
    ...gistPages,
    ...blogPages,
    ...projectPages,
    ...linkPages,
    ...repoPages,
  ];

  return allPages;
}
