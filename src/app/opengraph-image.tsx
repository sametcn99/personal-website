import { generateOgImage } from "@/lib/og";

// Remove runtime = edge because it might conflict if we share code that needs Node APIs,
// and to ensure consistency with other opengraph-image files that use fs (via generateOgImage -> ... wait no, the others use fs before calling generateOgImage)
// But safest bet to fix "not working" is to let Next.js choose or default to Node.js
// export const runtime = "edge";

export const alt = "Samet Can Cıncık | Web Developer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return generateOgImage("Samet Can Cıncık", "Web Developer");
}
