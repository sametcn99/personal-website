import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { useMDXComponents } from "../mdx-components";

/**
 * Transforms HTML details/summary tags to JSX Details/Summary components
 * before MDX compilation since MDX doesn't support raw HTML tags.
 * Skips transformation for content inside code blocks and inline code.
 */
function transformHtmlToJsx(source: string): string {
  // Regex to match code blocks (```...```) and inline code (`...`)
  const codeRegex = /(```[\s\S]*?```|`[^`\n]*`)/g;

  // Split by code blocks/inline code while keeping the delimiters
  const parts = source.split(codeRegex);

  return parts
    .map((part) => {
      // If this part is a code block or inline code, don't transform it
      if (part.match(codeRegex)) {
        return part;
      }

      // Transform HTML tags to JSX components for non-code parts
      return part
        .replace(/<details(\s|>)/gi, "<Details$1")
        .replace(/<\/details>/gi, "</Details>")
        .replace(/<summary(\s|>)/gi, "<Summary$1")
        .replace(/<\/summary>/gi, "</Summary>");
    })
    .join("");
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
