"use client";
import MarkdownPreview from "@uiw/react-markdown-preview";
import React, { useEffect, useState } from "react";

export default function MarkdownCompoment() {
  const [markdownContent, setMarkdownContent] = useState<string>("");

  useEffect(() => {
    async function fetchMarkdownContent() {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/sametcn99/personal-website/master/README.md"
        );
        if (response.ok) {
          const markdownText: string = await response.text();
          setMarkdownContent(markdownText);
        } else {
          console.error("Failed to retrieve Markdown content.");
        }
      } catch (error) {
        console.error("Error pulling Markdown content:", error);
      }
    }

    fetchMarkdownContent();
  }, []);
  return (
    <MarkdownPreview className="lg:p-36 pt-32 p-4" source={markdownContent} />
  );
}
