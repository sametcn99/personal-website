"use client";

import { alpha, Box, IconButton, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { generateId } from "./utils";

interface HeadingWithHashProps {
  children: React.ReactNode;
  level: 1 | 2 | 3;
  sx?: Record<string, unknown>;
  variant: "h1" | "h2" | "h3";
  [key: string]: unknown;
}

// Helper function to extract text content from React children
function getTextContent(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children;
  }
  if (typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(getTextContent).join("");
  }
  if (React.isValidElement(children)) {
    const element = children as React.ReactElement<{
      children?: React.ReactNode;
    }>;
    return getTextContent(element.props.children);
  }
  return "";
}

function HeadingWithHash({
  children,
  level,
  sx,
  variant,
  ...props
}: HeadingWithHashProps) {
  const theme = useTheme();
  const textContent = getTextContent(children);
  const id = generateId(textContent);

  const handleHashClick = () => {
    // Ensure we're in the browser
    if (typeof window === "undefined") return;

    // Update the URL hash
    window.location.hash = id;

    // Copy the full URL to clipboard
    const fullUrl = `${window.location.origin}${window.location.pathname}#${id}`;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(fullUrl).catch((err) => {
        // Fallback if clipboard API fails
        console.log("Could not copy to clipboard:", err);
      });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        "&:hover .hash-link": {
          opacity: 1,
          visibility: "visible",
        },
      }}
    >
      <IconButton
        className="hash-link"
        onClick={handleHashClick}
        sx={{
          position: "absolute",
          left: "-2rem",
          opacity: 0,
          visibility: "hidden",
          transition: "all 0.2s ease",
          color: theme.palette.text.secondary,
          fontSize:
            variant === "h1" ? "2.75rem" : variant === "h2" ? "2rem" : "1.5rem",
          fontWeight: "normal",
          padding: 0,
          minWidth: "auto",
          width: "1.5rem",
          height: "auto",
          "&:hover": {
            color: theme.palette.primary.main,
            backgroundColor: "transparent",
          },
        }}
        aria-label={`Link to ${textContent} section`}
      >
        #
      </IconButton>
      <Typography
        variant={variant}
        id={id}
        sx={sx}
        {...props}
        aria-label={`Heading ${level}: ${textContent}`}
      >
        {children}
      </Typography>
    </Box>
  );
}

export function H1({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  const theme = useTheme();

  return (
    <HeadingWithHash
      level={1}
      variant="h1"
      sx={{
        fontSize: "2.75rem",
        fontWeight: 700,
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "-0.02em",
        mb: 4,
        gutterBottom: true,
      }}
      {...props}
    >
      {children}
    </HeadingWithHash>
  );
}

export function H2({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  const theme = useTheme();

  return (
    <HeadingWithHash
      level={2}
      variant="h2"
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
    >
      {children}
    </HeadingWithHash>
  );
}

export function H3({
  children,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLHeadingElement>>) {
  const theme = useTheme();

  return (
    <HeadingWithHash
      level={3}
      variant="h3"
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
    >
      {children}
    </HeadingWithHash>
  );
}
