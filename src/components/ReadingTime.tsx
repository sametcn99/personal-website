"use client";

import TimerIcon from "@mui/icons-material/Timer";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";

export default function ReadingTime() {
  const [readingTime, setReadingTime] = useState<number>(0);

  useEffect(() => {
    setReadingTime(0);

    const timer = setTimeout(() => {
      const mainContent = document.querySelector("main");
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
    <Chip
      icon={<TimerIcon />}
      label={`${readingTime} min read`}
      size="small"
      variant="outlined"
      color="primary"
    />
  );
}
