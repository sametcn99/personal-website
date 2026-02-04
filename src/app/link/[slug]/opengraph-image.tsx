import { generateOgImage } from "@/lib/og";
import { socialMediaLinks } from "@/lib/social";

export const runtime = "nodejs";

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
  const social = socialMediaLinks.find((link) => link.type.includes(slug));

  if (!social) {
    return generateOgImage("Link Not Found", "Samet Can Cıncık");
  }

  return generateOgImage(social.label, "Link Redirect");
}
