"use client";

import { Typography } from "@mui/material";
import type React from "react";

export function H1({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <Typography
      variant="h1"
      sx={{
        fontSize: "2.75rem",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        mb: 2,
      }}
      gutterBottom
      {...props}
    >
      {children}
    </Typography>
  );
}

export function H2({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <Typography
      variant="h2"
      sx={{
        mt: 4,
        mb: 2,
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
          borderRadius: "2px",
        },
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function H3({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <Typography
      variant="h3"
      sx={{
        mt: 4,
        mb: 2,
        fontSize: "1.5rem",
        fontWeight: 500,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}
