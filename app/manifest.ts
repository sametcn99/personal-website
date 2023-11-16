import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "sametcc.me",
    short_name: "sametcc",
    description: "This is my personal website. Created with Next.js.",
    categories: ["personal", "portfolio"],
    theme_color: "#2196f3",
    background_color: "#2196f3",
    display: "minimal-ui",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/thumbnail.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
