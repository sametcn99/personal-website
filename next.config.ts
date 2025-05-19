import createMDX from "@next/mdx";
import rehypeHighlight from "rehype-highlight";
import rehypeMermaid from "rehype-mermaid";
import remarkGfm from "remark-gfm";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow .mdx extensions for files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight, rehypeMermaid],
  },
});

// Combine MDX and Next.js config
export default withMDX(nextConfig);
