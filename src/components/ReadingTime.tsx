"use client";

import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ReadingTime() {
  const [readingTime, setReadingTime] = useState<number>(0);

  useEffect(() => {
    setReadingTime(0);

    const timer = setTimeout(() => {
      const mainContent = document.querySelector("article");
      if (!mainContent) {
        return;
      }

      const text = mainContent.textContent || "";
      const wordCount = text
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      const time = Math.max(1, Math.ceil(wordCount / 200));
      setReadingTime(time);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Typography component="span" variant="body2" color="text.secondary">
      {readingTime} min read
    </Typography>
  );
}
