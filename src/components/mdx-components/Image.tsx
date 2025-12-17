"use client";

import { alpha } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import type React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt?: string;
}

export function ImageComponent({ alt, ...props }: ImageProps) {
  const theme = useTheme();
  const { width, height, src, ...rest } = props;

  // The src prop is required by Next.js Image, but optional in standard HTML attributes.
  // We strictly require it for execution but provide a fallback for TS safety if needed.
  if (!src) return null;

  return (
    <Image
      alt={alt || "Image"}
      src={src as string}
      width={0}
      height={0}
      sizes="100vw"
      style={{
        width: "100%",
        height: "auto",
        borderRadius:
          typeof theme.shape.borderRadius === "number"
            ? theme.shape.borderRadius * 2
            : 8,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
      }}
      {...rest}
    />
  );
}
