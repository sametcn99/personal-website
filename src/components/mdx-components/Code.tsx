"use client";

import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, {
  useCallback,
  useState,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";

interface CodeProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}

export function CodeComponent({
  children,
  className,
  ...props
}: PropsWithChildren<CodeProps>) {
  const theme = useTheme();
  const [copied, setCopied] = useState(false);
  const isInlineCode = !className;

  const handleCopy = useCallback(async () => {
    try {
      // Extract text from possible React nodes to avoid '[object Object]'
      const getTextFromChildren = (childrenNode: React.ReactNode): string => {
        let text = "";
        React.Children.forEach(childrenNode, (child) => {
          if (typeof child === "string" || typeof child === "number") {
            text += child.toString();
          } else if (React.isValidElement(child)) {
            if (
              child.props &&
              typeof child.props === "object" &&
              "children" in child.props
            ) {
              text += getTextFromChildren(
                child.props.children as React.ReactNode,
              );
            }
          }
        });
        return text;
      };

      const raw = getTextFromChildren(children);
      const codeText = raw ?? "";
      await navigator.clipboard.writeText(codeText.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback
      try {
        const getTextFromChildren = (childrenNode: React.ReactNode): string => {
          let text = "";
          React.Children.forEach(childrenNode, (child) => {
            if (typeof child === "string" || typeof child === "number") {
              text += child.toString();
            } else if (React.isValidElement(child)) {
              if (
                child.props &&
                typeof child.props === "object" &&
                "children" in child.props
              ) {
                text += getTextFromChildren(
                  child.props.children as React.ReactNode,
                );
              }
            }
          });
          return text;
        };

        const codeText = getTextFromChildren(children) || "";
        const textarea = document.createElement("textarea");
        textarea.value = codeText.trim();
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {}
    }
  }, [children]);

  if (isInlineCode) {
    return (
      <Typography
        component="code"
        sx={{
          color: "#1565c0",
          padding: "0.2em 0.4em",
          borderRadius: 1,
          fontFamily: "monospace",
          fontSize: "0.875em",
          fontWeight: 500,
        }}
        {...props}
        aria-label="Inline Code"
      >
        {children}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Header with buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
          borderBottom: `1px solid ${theme.palette.text.secondary}`,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontFamily: "monospace",
            fontSize: "0.75rem",
          }}
        >
          {className
            ? className
                .replace("language-", "")
                .replace("hljs", " ")
                .trimStart()
            : "code"}
        </Typography>

        <Stack direction="row" spacing={0.5}>
          <Tooltip title={copied ? "Copied" : "Copy"} arrow>
            <IconButton
              size="small"
              onClick={handleCopy}
              aria-label="copy code"
              color={copied ? "success" : "default"}
            >
              {copied ? (
                <CheckIcon fontSize="small" />
              ) : (
                <ContentCopyIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      {/* Code content */}
      <Box
        sx={{
          p: 2,
          overflow: "auto",
          maxHeight: "500px", // Optional: limit max height
        }}
      >
        <Typography
          component="code"
          sx={{
            fontFamily: "monospace",
            fontSize: "0.875em",
            display: "block",
            whiteSpace: "pre", // No wrapping
            wordBreak: "normal", // Don't break words
            overflowWrap: "normal", // Don't wrap overflow
          }}
          {...props}
          aria-label="Code Block"
        >
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
