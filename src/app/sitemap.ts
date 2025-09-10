import { getGistPosts } from "@/app/gist/utils";
import { getBlogPosts } from "@/lib/content";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
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
      url: `${baseUrl}/cv`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  // Dynamic gist pages
  const gistPosts = getGistPosts();
  const gistPages = gistPosts.map((post) => ({
    url: `${baseUrl}/gist/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogPosts = getBlogPosts();
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Combine all pages
  const allPages = [...staticPages, ...gistPages, ...blogPages];

  return allPages;
}
