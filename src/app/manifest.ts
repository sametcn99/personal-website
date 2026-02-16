import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Samet Can Cıncık | Web Developer",
    short_name: "Samet Can",
    description:
      "Web Developer passionate about creating compelling and user-friendly web experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c0c0cff",
    theme_color: "#0c0c0cff",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["education", "productivity", "developer"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Blog",
        short_name: "Blog",
        description: "View blog posts",
        url: "/blog",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Gists",
        short_name: "Gists",
        description: "View coding gists and tutorials",
        url: "/",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Writer",
        short_name: "Writer",
        description: "Open markdown editor",
        url: "/writer",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "CV",
        short_name: "CV",
        description: "View curriculum vitae",
        url: "/cv",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    ],
    prefer_related_applications: false,
    related_applications: [],
    dir: "ltr",
  };
}
