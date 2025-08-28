"use client";

import ShareIcon from "@mui/icons-material/Share";
import { Chip, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ShareButtonProps {
  title?: string;
  contentType?: "gist" | "post" | "article";
}

export default function ShareButton({ 
  title, 
  contentType = "article" 
}: ShareButtonProps) {
  const theme = useTheme();

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
    <Chip
      icon={<ShareIcon />}
      label="Share"
      onClick={handleShare}
      clickable
      color="secondary"
      variant="outlined"
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
        },
      }}
    />
  );
}