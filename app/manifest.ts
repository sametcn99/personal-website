import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Samet Can Cıncık",
    short_name: "sametcc",
    dir: "auto",
    description: "This is my personal website. Created with Next.js.",
    categories: ["personal", "portfolio"],
    theme_color: "#000000",
    background_color: "#000000",
    display: "standalone",
    scope: "/",
    lang: "en-US",
    launch_handler: {
      url: "https://www.sametcc.me/",
    },
    start_url: "/",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.png",
        sizes: "300x300",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.png",
        sizes: "300x300",
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
