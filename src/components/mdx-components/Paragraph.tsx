"use client";

import { Typography } from "@mui/material";
import React from "react";

import { TypographyProps } from "@mui/material";

function isInsideParagraph() {
  try {
    return document.querySelector("p:has(p)") !== null;
  } catch {
    return false;
  }
}

export function Paragraph({
  children,
  ...props
}: React.PropsWithChildren<TypographyProps>) {
  return (
    <Typography
      component={isInsideParagraph() ? "span" : "p"}
      variant="body1"
      sx={{
        "&:not(:first-of-type)": { mt: 2 },
        fontSize: "1rem",
        lineHeight: 1.7,
        letterSpacing: "0.01em",
        display: "block", // Ensure span still behaves like a block element
      }}
      {...props}
      aria-label="Paragraph"
    >
      {children}
    </Typography>
  );
}
