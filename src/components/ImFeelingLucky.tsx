"use client";

import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useUmami } from "@/hooks/useUmami";

interface ImFeelingLuckyProps {
  /** All available content items to pick from */
  contents: ContentMetadata[];
  /**
   * The visual style of the component.
   * @default "button"
   */
  variant?: "button" | "text";
}

/**
 * A button that navigates to a random content page when clicked.
 * Displays "I'm Feeling Lucky" text with a dice icon.
 */
export default function ImFeelingLucky({ contents }: ImFeelingLuckyProps) {
  const router = useRouter();
  const { trackEvent } = useUmami();

  const handleClick = useCallback(() => {
    if (contents.length === 0) return;

    const randomIndex = Math.floor(Math.random() * contents.length);
    const randomContent = contents[randomIndex];

    if (randomContent?.href) {
      trackEvent("im_feeling_lucky_click", {
        destination: randomContent.href,
      });
      router.push(randomContent.href);
    }
  }, [contents, router, trackEvent]);

  if (contents.length === 0) return null;

  return (
    <Button
      onClick={handleClick}
      disableRipple
      sx={{
        textTransform: "none",
        padding: 0,
        minWidth: 0,
        minHeight: 0,
        color: "text.secondary",
        lineHeight: "inherit",
        verticalAlign: "baseline",
        "&:hover": {
          textDecoration: "underline",
          backgroundColor: "transparent",
        },
      }}
    >
      <Typography variant="caption" color="inherit">
        I&apos;m Feeling Lucky
      </Typography>
    </Button>
  );
}
