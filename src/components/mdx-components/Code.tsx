'use client';

import { Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function CodeComponent({ children, className, ...props }: React.PropsWithChildren<CodeProps>) {
  const theme = useTheme();
  const isInlineCode = !className;
  
  if (isInlineCode) {
    return (
      <Typography 
        component="code" 
        sx={{
          backgroundColor: alpha(theme.palette.primary.light, 0.1),
          color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
          padding: "0.2em 0.4em",
          borderRadius: 1,
          fontFamily: "monospace",
          fontSize: "0.875em",
        }}
        {...props}
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
    >
      {children}
    </Typography>
  );
}
