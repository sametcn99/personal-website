"use client";

import { Typography } from "@mui/material";
import React from "react";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function CodeComponent({
  children,
  className,
  ...props
}: React.PropsWithChildren<CodeProps>) {
  const isInlineCode = !className;

  if (isInlineCode) {
    return (
      <Typography
        component="code"
        sx={{
          color: "#1565c0",
          padding: "0.2em 0.4em",
          borderRadius: 1,
          fontFamily: "monospace",
          fontSize: "0.875em",
          fontWeight: 500,
        }}
        {...props}
        aria-label="Inline Code"
      >
        {children}
      </Typography>
    );
  }

  return (
    <Typography
      component="code"
      sx={{
        fontFamily: "monospace",
        fontSize: "0.875em",
      }}
      {...props}
      aria-label="Code Block"
    >
      {children}
    </Typography>
  );
}
