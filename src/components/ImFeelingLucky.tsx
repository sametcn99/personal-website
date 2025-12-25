"use client";

import CasinoIcon from "@mui/icons-material/Casino";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useUmami } from "@/hooks/useUmami";

interface ImFeelingLuckyProps {
  /** All available content items to pick from */
  contents: ContentMetadata[];
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
      variant="outlined"
      startIcon={<CasinoIcon />}
      onClick={handleClick}
      sx={{
        mt: 2,
        textTransform: "none",
        borderStyle: "dashed",
        "&:hover": {
          borderStyle: "solid",
        },
      }}
    >
      I&apos;m Feeling Lucky
    </Button>
  );
}
