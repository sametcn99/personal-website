"use client";

import { Typography } from "@mui/material";

interface ShareButtonProps {
  title?: string;
  contentType?: ContentType;
}

/**
 * Converts content type values into a stable Umami-safe event segment.
 */
function toEventSegment(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "content";
}

const copyToClipboard = (text: string): Promise<void> => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  return new Promise((resolve, reject) => {
    try {
      document.execCommand("copy");
      resolve();
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(textarea);
    }
  });
};

export default function ShareButton({
  title,
  contentType = "blog",
}: ShareButtonProps) {
  const contentTypeEventSegment = toEventSegment(contentType);

  const getDefaultTitle = (): string => {
    switch (contentType) {
      case "gist":
        return "Technical Gist";
      case "blog":
        return "Blog Post";
      case "project":
        return "Project";
      default:
        return "Article";
    }
  };

  const handleShare = async () => {
    const shareTitle = title || getDefaultTitle();
    const shareUrl = window.location.href;

    const isShareSupported = typeof navigator.share !== "undefined";

    if (isShareSupported) {
      await navigator.share({
        title: shareTitle,
        url: shareUrl,
      });
      return;
    }

    try {
      await copyToClipboard(shareUrl);
      alert(`${shareTitle} URL copied!`);
    } catch {
      alert("Failed to copy URL. Please copy it manually.");
    }
  };

  return (
    <Typography
      onClick={handleShare}
      data-umami-event={`share-${contentTypeEventSegment}-click`}
      color="textSecondary"
      variant="body2"
      title={`Share this ${contentType} or copy link`}
      sx={{
        cursor: "pointer",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      Share this {contentType}
    </Typography>
  );
}
