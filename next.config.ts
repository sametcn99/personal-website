import createMDX from "@next/mdx";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow .mdx extensions for files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Set the correct workspace root to avoid lockfile detection issues
  outputFileTracingRoot: __dirname,
  // Force consistent route generation
  trailingSlash: false,
  // Enable standalone output for Docker builds
  output: 'standalone' as const,
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
const finalConfig = {
  ...mdxConfig,
  output: 'standalone' as const,
};
export default finalConfig;
