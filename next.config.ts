import createMDX from "@next/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const buildCpuLimit = Number(process.env.NEXT_BUILD_CPUS ?? "2");

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
  output: "standalone" as const,
  // Keep production bundle lean and build safer on low-memory VPS targets
  productionBrowserSourceMaps: false,
  experimental: {
    // Restrict build parallelism for lower peak CPU/RAM usage
    cpus:
      Number.isFinite(buildCpuLimit) && buildCpuLimit > 0 ? buildCpuLimit : 2,
    memoryBasedWorkersCount: true,
    webpackBuildWorker: true,
    webpackMemoryOptimizations: true,
    parallelServerCompiles: false,
    parallelServerBuildTraces: false,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 50,
  },
  // Configure allowed image hostnames
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "img.shields.io",
      },
      {
        protocol: "https" as const,
        hostname: "github.com",
      },
      {
        protocol: "https" as const,
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https" as const,
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

// Combine MDX and Next.js config, ensuring 'output' is present
const mdxConfig = withMDX(nextConfig);
const finalConfig = mdxConfig;
export default finalConfig;
