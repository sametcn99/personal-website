"use client";

import { Typography } from "@mui/material";

interface ShareButtonProps {
  title?: string;
  contentType?: "gist" | "post" | "article";
}

export default function ShareButton({
  title,
  contentType = "article",
}: ShareButtonProps) {
  const getDefaultTitle = () => {
    switch (contentType) {
      case "gist":
        return "Technical Gist";
      case "post":
        return "Blog Post";
      default:
        return "Article";
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: title || getDefaultTitle(),
        url: window.location.href,
      });
    } catch {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Typography
      onClick={handleShare}
      color="textSecondary"
      variant="body2"
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
