"use client";

import { Typography, alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { generateId } from "./utils";

export function H1({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  const theme = useTheme();

  return (
    <Typography
      variant="h1"
      id={generateId(String(children))}
      gutterBottom
      sx={{
        fontSize: "2.75rem",
        fontWeight: 700,
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "-0.02em",
        mb: 4,
      }}
      {...props}
      aria-label={`Heading 1: ${String(children)}`}
    >
      {children}
    </Typography>
  );
}

export function H2({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  const theme = useTheme();

  return (
    <Typography
      variant="h2"
      id={generateId(String(children))}
      sx={{
        mt: 6,
        mb: 3,
        fontSize: "2rem",
        fontWeight: 600,
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: -8,
          left: 0,
          width: "3rem",
          height: "3px",
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, transparent)`,
          borderRadius: "2px",
        },
      }}
      {...props}
      aria-label={`Heading 2: ${String(children)}`}
    >
      {children}
    </Typography>
  );
}

export function H3({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  const theme = useTheme();

  return (
    <Typography
      variant="h3"
      id={generateId(String(children))}
      sx={{
        mt: 5,
        mb: 2.5,
        fontSize: "1.5rem",
        fontWeight: 500,
        color:
          theme.palette.mode === "dark"
            ? alpha(theme.palette.primary.main, 0.9)
            : theme.palette.primary.dark,
      }}
      {...props}
      aria-label={`Heading 3: ${String(children)}`}
    >
      {children}
    </Typography>
  );
}
