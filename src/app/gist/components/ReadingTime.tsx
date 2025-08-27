"use client";

import TimerIcon from "@mui/icons-material/Timer";
import { Chip } from "@mui/material";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface ReadingTimeProps {
  children: React.ReactNode;
}

export default function ReadingTime({ children }: ReadingTimeProps) {
  const pathname = usePathname();
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const mainContent = document.querySelector("main");
      if (!mainContent) return;

      const text = mainContent.textContent || "";
      const wordCount = text
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      const time = Math.max(1, Math.ceil(wordCount / 200));
      setReadingTime(time);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, children]);

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