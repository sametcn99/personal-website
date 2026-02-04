import { getProjectPosts } from "@/lib/content";
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
  const post = getProjectPosts().find((p) => p.slug === slug);

  if (!post) {
    return generateOgImage("Project Not Found", "Samet Can Cıncık");
  }

  return generateOgImage(post.metadata.title, "Samet Can Cıncık");
}
