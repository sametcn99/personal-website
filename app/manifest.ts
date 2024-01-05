import { siteConfig } from "@/site-config";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.short_name,
    dir: "auto",
    description: siteConfig.description,
    categories: siteConfig.categories,
    theme_color: siteConfig.theme_color,
    background_color: siteConfig.background_color,
    display: "standalone",
    scope: siteConfig.scope,
    lang: siteConfig.locale,
    launch_handler: siteConfig.launch_handler,
    start_url: siteConfig.start_url,
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
