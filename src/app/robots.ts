import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://sametcc.me"; // Replace with your actual domain

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/favicon.ico", "/*.svg", "/public/"],
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
