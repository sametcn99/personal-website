import createMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Allow .mdx extensions for files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  
  // Optimize for large MDX files
  experimental: {
    largePageDataBytes: 512 * 1024, // 512KB limit for large pages
    mdxRs: false, // Disable Rust-based MDX for stability with large files
  },
  
  // Increase memory and compilation limits
  webpack: (config) => {
    // Increase memory limit for webpack
    if (config.optimization) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        maxSize: 200000, // 200KB chunks
      };
    }
    
    return config;
  },
  
  // Fix workspace root warning
  outputFileTracingRoot: process.cwd(),
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

// Combine MDX and Next.js config
export default withMDX(nextConfig);
