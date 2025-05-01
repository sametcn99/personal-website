'use client';

import { Typography } from "@mui/material";
import React from "react";

import { TypographyProps } from "@mui/material";

export function Paragraph({ children, ...props }: React.PropsWithChildren<TypographyProps>) {
  return (
    <Typography 
      variant="body1" 
      sx={{ 
        "&:not(:first-of-type)": { mt: 2 }, 
        fontSize: "1rem",
        lineHeight: 1.7,
        letterSpacing: "0.01em",
      }} 
      {...props}
    >
      {children}
    </Typography>
  );
}
