import React, { useEffect, useState } from "react";
export async function FetchMarkdownContent() {
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
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