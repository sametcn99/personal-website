"use client";

import { Box } from "@mui/material";
import mermaid from "mermaid";
import { useEffect, useRef } from "react";

interface MermaidProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "monospace",
});

export function MermaidComponent({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = `mermaid-${Math.random().toString(36).substring(7)}`;

  useEffect(() => {
    if (containerRef.current) {
      mermaid.render(uniqueId, chart).then(({ svg }) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      });
    }
  }, [chart, uniqueId]);

  return (
    <Box
      ref={containerRef}
      aria-label="Mermaid chart"
      sx={{
        "& svg": {
          maxWidth: "100%",
          height: "auto",
        },
      }}
    />
  );
}
