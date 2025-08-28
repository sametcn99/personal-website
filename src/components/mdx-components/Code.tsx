"use client";

import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function CodeComponent({
  children,
  className,
  ...props
}: React.PropsWithChildren<CodeProps>) {
  const theme = useTheme();
  const isInlineCode = !className;

  if (isInlineCode) {
    return (
      <Typography
        component="code"
        sx={{
          backgroundColor: theme.palette.mode === 'dark' 
            ? '#1e1e1e'
            : '#f5f5f5',
          color: theme.palette.mode === 'dark'
            ? '#e3f2fd'
            : '#1565c0',
          border: theme.palette.mode === 'dark'
            ? '1px solid #424242'
            : '1px solid #e0e0e0',
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
