import { generateOgImage } from "@/lib/og";

export const runtime = "nodejs";

export const alt = "Samet Can Cıncık | RSS Feed";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return generateOgImage("RSS Feed", "Subscribe to updates");
}
