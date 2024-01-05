import { siteConfig } from "@/site-config";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.short_name,
    dir: siteConfig.dir,
    description: siteConfig.description,
    categories: siteConfig.categories,
    theme_color: siteConfig.theme_color,
    background_color: siteConfig.background_color,
    display: siteConfig.display,
    scope: siteConfig.scope,
    lang: siteConfig.locale,
    launch_handler: siteConfig.launch_handler,
    start_url: siteConfig.start_url,
    orientation: siteConfig.orientation,
    icons: siteConfig.icons,
  };
}
