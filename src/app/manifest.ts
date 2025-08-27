import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Samet Can Cıncık | Web Developer",
    short_name: "Samet Can",
    description:
      "Web Developer passionate about creating compelling and user-friendly web experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
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
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
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
    screenshots: [
      {
        src: "/screenshot-wide.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Desktop view of the website",
      },
      {
        src: "/screenshot-narrow.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "Mobile view of the website",
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
            src: "/icon-192.png",
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
            src: "/icon-192.png",
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
            src: "/icon-192.png",
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
