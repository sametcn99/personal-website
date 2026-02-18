import createMDX from "@next/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
  /**
   * Proxies Umami assets and event endpoints through first-party paths.
   */
  async rewrites() {
    return [
      {
        source: "/stats/script.js",
        destination: "https://umami.sametcc.me/script.js",
      },
      {
        source: "/stats/:path*",
        destination: "https://umami.sametcc.me/:path*",
      },
    ];
  },
  // Allow .mdx extensions for files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Set the correct workspace root to avoid lockfile detection issues
  outputFileTracingRoot: __dirname,
  // Force consistent route generation
  trailingSlash: false,
  // Enable standalone output for Docker builds
  output: "standalone",
  productionBrowserSourceMaps: false,
  // Configure allowed image hostnames
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.shields.io",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "golter.sametcc.me",
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm, remarkMath, remarkMdxFrontmatter],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
      rehypeHighlight,
    ],
  },
});

export default withMDX(nextConfig);
