/**
 * JSON Feed route
 *
 * Serves a combined JSON Feed of blog posts, gists and projects at /feed.json
 * - Set NEXT_PUBLIC_SITE_URL environment variable to the production site URL (e.g. https://example.com)
 * - Feed URL will be available at `${NEXT_PUBLIC_SITE_URL}/feed.json`
 * - Spec: https://jsonfeed.org/version/1.1
 */
import { getBlogPosts, getGistPosts, getProjectPosts } from "../../lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function ensureAbsoluteUrl(path: string) {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${SITE_URL}${path}`;
}

export async function GET() {
  // Gather items from all content sources
  const blog = getBlogPosts();
  const gists = getGistPosts();
  const projects = getProjectPosts();

  const allItems = [
    ...blog.map((i) => ({ ...i, _type: "blog" as const })),
    ...gists.map((i) => ({ ...i, _type: "gist" as const })),
    ...projects.map((i) => ({ ...i, _type: "project" as const })),
  ];

  // sort by publishedAt desc
  allItems.sort((a, b) => {
    const da = new Date(a.metadata.publishedAt).getTime();
    const db = new Date(b.metadata.publishedAt).getTime();
    return db - da;
  });

  // Build JSON Feed
  const feed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Samet Can Cıncık — All content",
    description: "Combined feed for blog posts, gists and projects",
    home_page_url: SITE_URL,
    feed_url: ensureAbsoluteUrl("/feed.json"),
    language: "en",
    authors: [
      {
        name: "Samet Can Cıncık",
        url: SITE_URL,
      },
    ],
    items: allItems.map((item) => {
      const prefix =
        item._type === "blog"
          ? "/blog"
          : item._type === "gist"
            ? "/gist"
            : "/project";
      const url = ensureAbsoluteUrl(`${prefix}/${item.slug}`);

      const summary =
        item.metadata.summary ||
        (item.content ? item.content.slice(0, 300) : "");

      const tags = Array.isArray(item.metadata.tags)
        ? item.metadata.tags
        : item.metadata.tags
          ? [String(item.metadata.tags)]
          : [];

      return {
        id: url,
        url,
        title: item.metadata.title || item.slug,
        summary,
        content_text: summary,
        date_published: new Date(item.metadata.publishedAt).toISOString(),
        authors: [
          {
            name: item.metadata.author ?? "Samet Can Cıncık",
          },
        ],
        tags,
        ...(item.metadata.image && {
          image: ensureAbsoluteUrl(item.metadata.image),
        }),
      };
    }),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      "Content-Type": "application/feed+json; charset=utf-8",
      "Content-Disposition": 'inline; filename="feed.json"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
