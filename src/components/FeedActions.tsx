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

/**
 * Converts a URL/path into a stable Umami-safe event segment.
 */
function toEventSegment(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "feed";
}

export default function FeedActions({
  url,
  color = "primary",
}: FeedActionsProps) {
  const [copied, setCopied] = useState(false);
  const eventSegment = toEventSegment(url);

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
        data-umami-event={`feed-open-${eventSegment}-click`}
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
        data-umami-event={`feed-copy-${eventSegment}-click`}
      >
        {copied ? "Copied!" : "Copy Link"}
      </Button>
    </Stack>
  );
}
