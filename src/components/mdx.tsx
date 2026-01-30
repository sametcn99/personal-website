import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { useMDXComponents } from "../mdx-components";

/**
 * Transforms HTML details/summary tags to JSX Details/Summary components
 * before MDX compilation since MDX doesn't support raw HTML tags.
 */
function transformHtmlToJsx(source: string): string {
  return source
    .replace(/<details(\s|>)/gi, "<Details$1")
    .replace(/<\/details>/gi, "</Details>")
    .replace(/<summary(\s|>)/gi, "<Summary$1")
    .replace(/<\/summary>/gi, "</Summary>");
}

export function CustomMDX({ source }: { source: string }) {
  const components = useMDXComponents({});
  const transformedSource = transformHtmlToJsx(source);

  return (
    <MDXRemote
      source={transformedSource}
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
