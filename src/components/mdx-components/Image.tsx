"use client";

import { alpha, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
}

export function ImageComponent({ alt, ...props }: ImageProps) {
  const theme = useTheme();

  return (
    <Box
      component="img"
      alt={alt}
      sx={{
        maxWidth: "100%",
        height: "auto",
        borderRadius: 2,
        my: 3,
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
      }}
      {...props}
      aria-label={alt || "Image"}
    />
  );
}
