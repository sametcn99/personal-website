"use client";

import { Box, Link as MuiLink } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import type React from "react";
import { useId } from "react";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export function LinkComponent({
  children,
  href,
  ...props
}: React.PropsWithChildren<LinkProps>) {
  const theme = useTheme();
  const uniqueId = useId();

  // Handle anchor links (same page scroll)
  if (href?.startsWith("#")) {
    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    return (
      <MuiLink
        href={href}
        onClick={handleAnchorClick}
        className={`link-${uniqueId}`}
        sx={{
          textDecoration: "none",
          color: theme.palette.primary.main,
          fontWeight: 500,
          position: "relative",
          cursor: "pointer",
          [`&.link-${uniqueId}::after`]: {
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
          [`&.link-${uniqueId}:hover::after`]: {
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

  if (href?.startsWith("/")) {
    return (
      <MuiLink
        href={href}
        component={Link}
        className={`link-${uniqueId}`}
        sx={{
          textDecoration: "none",
          color: theme.palette.primary.main,
          fontWeight: 500,
          position: "relative",
          [`&.link-${uniqueId}::after`]: {
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
          [`&.link-${uniqueId}:hover::after`]: {
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
      className={`link-${uniqueId}`}
      sx={{
        textDecoration: "none",
        color: theme.palette.secondary.main,
        fontWeight: 500,
        position: "relative",
        [`&.link-${uniqueId}::after`]: {
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
        [`&.link-${uniqueId}:hover::after`]: {
          transform: "scaleX(1)",
          transformOrigin: "bottom left",
        },
      }}
      {...props}
      aria-label={`${String(children)} (opens in a new tab)`}
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
