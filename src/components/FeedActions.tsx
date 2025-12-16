"use client";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";

interface FeedActionsProps {
  url: string;
  color?: "primary" | "secondary";
}

export default function FeedActions({
  url,
  color = "primary",
}: FeedActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant="outlined"
        color={color}
        size="small"
        startIcon={<OpenInNewIcon />}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open
      </Button>
      <Button
        variant="outlined"
        color={color}
        size="small"
        startIcon={<ContentCopyIcon />}
        onClick={handleCopy}
      >
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </Stack>
  );
}
