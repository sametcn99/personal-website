"use client";

import { LinearProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const theme = useTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LinearProgress
      variant="determinate"
      value={scrollProgress}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar,
        height: 3,
        backgroundColor: "transparent",
        "& .MuiLinearProgress-bar": {
          backgroundColor: theme.palette.primary.main,
        },
      }}
    />
  );
}
