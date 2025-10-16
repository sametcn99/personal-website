"use client";

import { useUmami } from "@/hooks/useUmami";
import { Typography } from "@mui/material";

type ContentType = "gist" | "blog" | "project" | "article";

interface ShareButtonProps {
  title?: string;
  contentType?: ContentType;
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
  const { trackEvent } = useUmami();

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

      trackEvent("share_api_success", {
        contentType,
      });
      return;
    }

    try {
      await copyToClipboard(shareUrl);
      alert(`${shareTitle} URL copied!`);
      trackEvent("share_fallback_copied", {
        contentType,
        title: shareTitle,
      });
    } catch {
      alert("Failed to copy URL. Please copy it manually.");
    }
  };

  return (
    <Typography
      onClick={handleShare}
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
      Share this {contentType} &nbsp;
    </Typography>
  );
}
