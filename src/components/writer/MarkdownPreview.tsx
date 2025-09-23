"use client";

import { Box } from "@mui/material";
import type React from "react";
import {
  BlockQuote,
  CodeComponent,
  H1,
  H2,
  H3,
  HorizontalRule,
  LinkComponent,
  ListItemComponent,
  OrderedList,
  Paragraph,
  PreComponent,
  UnorderedList,
} from "../mdx-components";

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  // Basit markdown parsing
  const parseMarkdown = (text: string) => {
    const lines = text.split("\n");
    const elements: React.ReactElement[] = [];
    let currentIndex = 0;

    while (currentIndex < lines.length) {
      const line = lines[currentIndex];
      const key = `line-${currentIndex}-${Math.random()}`;

      // Boş satırları atla
      if (!line.trim()) {
        currentIndex++;
        continue;
      }

      // Headers
      if (line.startsWith("### ")) {
        elements.push(<H3 key={key}>{line.slice(4)}</H3>);
      } else if (line.startsWith("## ")) {
        elements.push(<H2 key={key}>{line.slice(3)}</H2>);
      } else if (line.startsWith("# ")) {
        elements.push(<H1 key={key}>{line.slice(2)}</H1>);
      }
      // Horizontal Rule
      else if (line.trim() === "---" || line.trim() === "***") {
        elements.push(<HorizontalRule key={key} />);
      }
      // Blockquote
      else if (line.startsWith("> ")) {
        const blockquoteLines = [];
        let blockIndex = currentIndex;
        while (
          blockIndex < lines.length &&
          lines[blockIndex].startsWith("> ")
        ) {
          blockquoteLines.push(lines[blockIndex].slice(2));
          blockIndex++;
        }
        elements.push(
          <BlockQuote key={key}>
            <Paragraph>{blockquoteLines.join(" ")}</Paragraph>
          </BlockQuote>,
        );
        currentIndex = blockIndex - 1;
      }
      // Code blocks
      else if (line.startsWith("```")) {
        const language = line.slice(3).trim();
        const codeLines = [];
        currentIndex++;
        while (
          currentIndex < lines.length &&
          !lines[currentIndex].startsWith("```")
        ) {
          codeLines.push(lines[currentIndex]);
          currentIndex++;
        }
        elements.push(
          <PreComponent key={key}>
            <CodeComponent className={`language-${language}`}>
              {codeLines.join("\n")}
            </CodeComponent>
          </PreComponent>,
        );
      }
      // Unordered List
      else if (line.startsWith("- ") || line.startsWith("* ")) {
        const listItems = [];
        let listIndex = currentIndex;
        while (
          listIndex < lines.length &&
          (lines[listIndex].startsWith("- ") ||
            lines[listIndex].startsWith("* "))
        ) {
          listItems.push(lines[listIndex].slice(2));
          listIndex++;
        }
        elements.push(
          <UnorderedList key={key}>
            {listItems.map((item) => (
              <ListItemComponent
                key={`${key}-item-${item.slice(0, 10)}-${Math.random()}`}
              >
                {parseInlineMarkdown(item)}
              </ListItemComponent>
            ))}
          </UnorderedList>,
        );
        currentIndex = listIndex - 1;
      }
      // Ordered List
      else if (/^\d+\. /.test(line)) {
        const listItems = [];
        let listIndex = currentIndex;
        while (listIndex < lines.length && /^\d+\. /.test(lines[listIndex])) {
          listItems.push(lines[listIndex].replace(/^\d+\. /, ""));
          listIndex++;
        }
        elements.push(
          <OrderedList key={key}>
            {listItems.map((item) => (
              <ListItemComponent
                key={`${key}-item-${item.slice(0, 10)}-${Math.random()}`}
              >
                {parseInlineMarkdown(item)}
              </ListItemComponent>
            ))}
          </OrderedList>,
        );
        currentIndex = listIndex - 1;
      }
      // Regular paragraph
      else {
        elements.push(
          <Paragraph key={key}>{parseInlineMarkdown(line)}</Paragraph>,
        );
      }

      currentIndex++;
    }

    return elements;
  };

  // Inline markdown parsing (bold, italic, code, links)
  const parseInlineMarkdown = (text: string): React.ReactNode => {
    if (!text) return text;

    // Link regex: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = text.split(linkRegex);

    return parts
      .map((part, index) => {
        // Check if this part is a link text (odd indices after split)
        if (index > 0 && index % 3 === 1) {
          const url = parts[index + 1];
          return (
            <LinkComponent key={`link-${index}-${Math.random()}`} href={url}>
              {part}
            </LinkComponent>
          );
        }
        // Skip URL parts (index % 3 === 2)
        if (index > 0 && index % 3 === 2) {
          return null;
        }

        // Process bold, italic, code for regular text
        return part
          .split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g)
          .map((segment, segIndex) => {
            const segKey = `seg-${index}-${segIndex}-${Math.random()}`;

            if (segment.startsWith("**") && segment.endsWith("**")) {
              return <strong key={segKey}>{segment.slice(2, -2)}</strong>;
            } else if (segment.startsWith("*") && segment.endsWith("*")) {
              return <em key={segKey}>{segment.slice(1, -1)}</em>;
            } else if (segment.startsWith("`") && segment.endsWith("`")) {
              return (
                <CodeComponent key={segKey}>
                  {segment.slice(1, -1)}
                </CodeComponent>
              );
            }
            return segment;
          });
      })
      .filter(Boolean);
  };

  if (!content.trim()) {
    return <div>No content to preview</div>;
  }

  return (
    <Box
      sx={{
        fontSize: "inherit",
        lineHeight: "inherit",
        fontFamily: "inherit",
      }}
    >
      {parseMarkdown(content)}
    </Box>
  );
}
