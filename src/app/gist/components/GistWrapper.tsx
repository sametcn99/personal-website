"use client";

import ArticleWrapper from "@/components/ArticleWrapper";

interface GistData {
  href: string;
  title: string;
  lastModified: string;
}

interface GistWrapperProps {
  children: React.ReactNode;
  currentGist?: GistData | null;
  prevGist?: GistData | null;
  nextGist?: GistData | null;
}

export default function GistWrapper({
  children,
  currentGist,
  prevGist,
  nextGist,
}: GistWrapperProps) {
  return (
    <ArticleWrapper
      currentArticle={currentGist}
      prevArticle={prevGist}
      nextArticle={nextGist}
      contentType="gist"
      publishedLabel="Last updated"
      prevLabel="Previous"
      nextLabel="Next"
    >
      {children}
    </ArticleWrapper>
  );
}
