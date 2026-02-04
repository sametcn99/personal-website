import { getBlogPosts } from "@/lib/content";
import { generateOgImage } from "@/lib/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPosts().find((p) => p.slug === slug);

  if (!post) {
    return generateOgImage("Blog Post Not Found", "Samet Can Cıncık");
  }

  return generateOgImage(post.metadata.title, "Samet Can Cıncık");
}
