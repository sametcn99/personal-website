"use client";

import { Box, Link as MuiLink } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import React from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export function LinkComponent({
  children,
  href,
  ...props
}: React.PropsWithChildren<LinkProps>) {
  const theme = useTheme();

  if (href && href.startsWith("/")) {
    return (
      <MuiLink
        href={href}
        component={Link}
        sx={{
          textDecoration: "none",
          color: theme.palette.primary.main,
          fontWeight: 500,
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "2px",
            bottom: -2,
            left: 0,
            backgroundColor: theme.palette.primary.main,
            transform: "scaleX(0)",
            transformOrigin: "bottom right",
            transition: "transform 0.3s ease-out",
          },
          "&:hover::after": {
            transform: "scaleX(1)",
            transformOrigin: "bottom left",
          },
        }}
        {...props}
        aria-label={String(children)}
      >
        {children}
      </MuiLink>
    );
  }

  return (
    <MuiLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        textDecoration: "none",
        color: theme.palette.secondary.main,
        fontWeight: 500,
        position: "relative",
        "&::after": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "2px",
          bottom: -2,
          left: 0,
          backgroundColor: theme.palette.secondary.main,
          transform: "scaleX(0)",
          transformOrigin: "bottom right",
          transition: "transform 0.3s ease-out",
        },
        "&:hover::after": {
          transform: "scaleX(1)",
          transformOrigin: "bottom left",
        },
      }}
      {...props}
      aria-label={String(children) + " (opens in a new tab)"}
    >
      {children}
      <Box
        component="span"
        sx={{
          fontSize: "0.8rem",
          ml: 0.5,
          verticalAlign: "super",
        }}
      >
        ↗
      </Box>
    </MuiLink>
  );
}
