"use client";

import { Box, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { MermaidComponent } from "./Mermaid";

interface PreChildProps {
  className?: string;
  children?: string;
}

export function PreComponent({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLPreElement>>) {
  const theme = useTheme();

  // Check if this is a mermaid code block
  if (
    React.isValidElement(children) &&
    (children.props as PreChildProps)?.className?.includes("language-mermaid")
  ) {
    return (
      <MermaidComponent
        chart={(children.props as PreChildProps).children || ""}
      />
    );
  }

  return (
    <Box
      component="pre"
      {...props}
      aria-label="code block"
      sx={{
        position: "relative",
        overflow: "auto",
        borderRadius: 2,
        bgcolor: "#1a1a1a",
        color: "#e6e6e6",
        width: "100%",
        marginY: 3,
        padding: 2,
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        "&::-webkit-scrollbar": {
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: alpha(theme.palette.common.black, 0.05),
        },
      }}
    >
      {children}
    </Box>
  );
}
