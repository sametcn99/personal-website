/**
 * RSS feed route
 *
 * Serves a combined RSS feed of blog posts, gists and projects at /rss.xml
 * - Set NEXT_PUBLIC_SITE_URL environment variable to the production site URL (e.g. https://example.com)
 * - Feed URL will be available at `${NEXT_PUBLIC_SITE_URL}/rss.xml`
 */
import RSS from "rss";
import { getBlogPosts, getGistPosts, getProjectPosts } from "../../lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function ensureAbsoluteUrl(path: string) {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${SITE_URL}${path}`;
}

export async function GET() {
  // Build feed metadata
  const feed = new RSS({
    title: "Samet Can Cıncık — All content",
    description: "Combined RSS feed for blog posts, gists and projects",
    feed_url: ensureAbsoluteUrl("/rss.xml"),
    site_url: SITE_URL,
    language: "en",
  });

  // Gather items from all content sources
  const blog = getBlogPosts();
  const gists = getGistPosts();
  const projects = getProjectPosts();

  const allItems = [
    ...blog.map((i) => ({ ...i, _type: "blog" })),
    ...gists.map((i) => ({ ...i, _type: "gist" })),
    ...projects.map((i) => ({ ...i, _type: "project" })),
  ];

  // sort by publishedAt desc
  allItems.sort((a, b) => {
    const da = new Date(a.metadata.publishedAt).getTime();
    const db = new Date(b.metadata.publishedAt).getTime();
    return db - da;
  });

  // Map items to RSS
  for (const item of allItems) {
    const prefix =
      item._type === "blog"
        ? "/blog"
        : item._type === "gist"
          ? "/gist"
          : "/project";
    const url = ensureAbsoluteUrl(`${prefix}/${item.slug}`);

    const description =
      item.metadata.summary || (item.content ? item.content.slice(0, 300) : "");

    const categories = Array.isArray(item.metadata.tags)
      ? item.metadata.tags
      : item.metadata.tags
        ? [String(item.metadata.tags)]
        : [];

    // Add item
    feed.item({
      title: item.metadata.title || item.slug,
      description,
      url,
      guid: url,
      date: item.metadata.publishedAt,
      author: item.metadata.author ?? "Samet Can Cıncık",
      categories,
      enclosure: item.metadata.image
        ? { url: ensureAbsoluteUrl(item.metadata.image) }
        : undefined,
    });
  }

  const xml = feed.xml({ indent: true });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
