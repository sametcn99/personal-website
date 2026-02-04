import { generateOgImage } from "@/lib/og";

export const runtime = "nodejs";

export const alt = "Samet Can Cıncık | README";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return generateOgImage("README", "Samet Can Cıncık");
}
