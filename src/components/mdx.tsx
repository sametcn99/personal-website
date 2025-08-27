import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { useMDXComponents } from "../mdx-components";

export function CustomMDX({ source }: { source: string }) {
  const components = useMDXComponents({});

  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, rehypeHighlight],
        },
      }}
    />
  );
}
