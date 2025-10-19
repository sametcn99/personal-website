import { getProjectPosts } from "@/lib/content";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;
    const offset = searchParams.get("offset")
      ? parseInt(searchParams.get("offset")!)
      : 0;
    const search = searchParams.get("search");
    const tag = searchParams.get("tag");

    // Get project posts and transform them to match the expected format
    let projectPosts = getProjectPosts().map((post) => ({
      title: post.metadata.title,
      href: `/project/${post.slug}`,
      publishedAt: post.metadata.publishedAt,
      summary: post.metadata.summary,
      tags: post.metadata.tags || [],
      language: post.metadata.language || "en",
    }));

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      projectPosts = projectPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.summary.toLowerCase().includes(searchLower),
      );
    }

    // Apply tag filter
    if (tag) {
      projectPosts = projectPosts.filter((post) =>
        post.tags.some((t) => t.toLowerCase() === tag.toLowerCase()),
      );
    }

    // Sort by date (newest first)
    projectPosts.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    const total = projectPosts.length;

    // Apply pagination
    if (limit !== undefined) {
      projectPosts = projectPosts.slice(offset, offset + limit);
    }

    return NextResponse.json({
      projectPosts,
      total,
      limit,
      offset,
      hasMore: limit ? offset + limit < total : false,
    });
  } catch (error) {
    console.error("Error fetching project posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch project posts" },
      { status: 500 },
    );
  }
}
