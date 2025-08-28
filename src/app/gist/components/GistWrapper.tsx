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
  postContent: string;
}

export default function GistWrapper({
  children,
  currentGist,
  prevGist,
  nextGist,
  postContent,
}: GistWrapperProps) {
  return (
    <ArticleWrapper
      currentArticle={currentGist}
      prevArticle={prevGist}
      nextArticle={nextGist}
      postContent={postContent}
      contentType="gist"
      publishedLabel="Last updated"
      prevLabel="Previous"
      nextLabel="Next"
    >
      {children}
    </ArticleWrapper>
  );
}
