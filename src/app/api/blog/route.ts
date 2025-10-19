import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/content";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;
    const offsetParam = searchParams.get("offset");
    const offset = offsetParam ? parseInt(offsetParam, 10) : 0;
    const search = searchParams.get("search");
    const tag = searchParams.get("tag");

    // Get blog posts and transform them to match the expected format
    let blogPosts = getBlogPosts().map((post) => ({
      title: post.metadata.title,
      href: `/blog/${post.slug}`,
      publishedAt: post.metadata.publishedAt,
      summary: post.metadata.summary,
      tags: post.metadata.tags || [],
      language: post.metadata.language || "en",
    }));

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      blogPosts = blogPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.summary.toLowerCase().includes(searchLower),
      );
    }

    // Apply tag filter
    if (tag) {
      blogPosts = blogPosts.filter((post) =>
        post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
      );
    }

    // Sort by date (newest first)
    blogPosts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    const total = blogPosts.length;

    // Apply pagination
    if (limit !== undefined) {
      blogPosts = blogPosts.slice(offset, offset + limit);
    }

    return NextResponse.json({
      blogPosts,
      total,
      limit,
      offset,
      hasMore: limit ? offset + limit < total : false,
    });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 },
    );
  }
}
