"use client";

import ShareIcon from "@mui/icons-material/Share";
import { Chip, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ShareButtonProps {
  title?: string;
}

export default function ShareButton({ title }: ShareButtonProps) {
  const theme = useTheme();

  const handleShare = async () => {
    try {
      await navigator.share({
        title: title || "Technical Gist",
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
