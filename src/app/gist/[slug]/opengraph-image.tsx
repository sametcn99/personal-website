import { getGistPosts } from "@/lib/content";
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
  const post = getGistPosts().find((p) => p.slug === slug);

  if (!post) {
    return generateOgImage("Gist Not Found", "Samet Can Cıncık");
  }

  return generateOgImage(post.metadata.title, "Samet Can Cıncık");
}
