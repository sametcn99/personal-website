"use client";
import MarkdownPreview from "@uiw/react-markdown-preview";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function MarkdownCompoment() {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  async function fetchMarkdownContent() {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/sametcn99/personal-website/master/README.md"
      );
      if (response.ok) {
        const markdownText: string = await response.text();
        setMarkdownContent(markdownText);
        setIsLoading(false);
      } else {
        console.error("Failed to retrieve Markdown content.");
      }
    } catch (error) {
      console.error("Error pulling Markdown content:", error);
    }
  }
  useEffect(() => {
    fetchMarkdownContent();
  }, []);
  return isLoading ? (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  ) : (
    <MarkdownPreview className="lg:p-36 pt-32 p-4" source={markdownContent} />
  );
}
