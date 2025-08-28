"use client";

import { Typography, alpha } from "@mui/material";
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
          backgroundColor: theme.palette.mode === 'light'
            ? alpha(theme.palette.text.primary, 0.1)
            : alpha(theme.palette.text.primary, 0.2),
          color: theme.palette.text.primary,
          padding: "0.2em 0.3em",
          borderRadius: 1,
          fontFamily: "monospace",
          fontSize: "0.875em",
          border: theme.palette.mode === 'light'
            ? `1px solid ${alpha(theme.palette.text.primary, 0.2)}`
            : 'none',
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
