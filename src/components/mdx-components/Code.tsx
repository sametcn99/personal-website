"use client";

import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { useTheme as useCustomTheme } from "@/hooks/useTheme";
import React, { useCallback, useState } from "react";

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function CodeComponent({
  children,
  className,
  ...props
}: React.PropsWithChildren<CodeProps>) {
  const theme = useTheme();
  const { mode, mounted } = useCustomTheme();
  const [copied, setCopied] = useState(false);
  const isInlineCode = !className;

  // Use mounted state to prevent hydration mismatch
  const safeMode = mounted ? mode : "light";

  const handleCopy = useCallback(async () => {
    try {
      const codeText =
        typeof children === "string" ? children : children?.toString() || "";
      await navigator.clipboard.writeText(codeText.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback
      try {
        const codeText =
          typeof children === "string" ? children : children?.toString() || "";
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

  const toolbarButtonSx = {
    bgcolor: alpha(
      safeMode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.background.paper,
      0.95,
    ),
    backdropFilter: "blur(8px)",
    border: `1px solid ${alpha(theme.palette.divider, safeMode === "dark" ? 0.7 : 0.5)}`,
    borderRadius: theme.shape.borderRadius,
    width: 32,
    height: 32,
    minWidth: 32,
    color: theme.palette.text.primary,
    transition: theme.transitions.create(
      ["background-color", "border-color", "transform"],
      {
        duration: theme.transitions.duration.short,
      },
    ),
    "&:hover": {
      bgcolor: alpha(theme.palette.primary.main, safeMode === "dark" ? 0.12 : 0.08),
      borderColor: alpha(
        theme.palette.primary.main,
        safeMode === "dark" ? 0.4 : 0.3,
      ),
      transform: "scale(1.05)",
    },
    "&:active": {
      transform: "scale(0.95)",
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: 2,
      bgcolor: alpha(theme.palette.primary.main, safeMode === "dark" ? 0.16 : 0.12),
    },
  } as const;

  return (
    <Box
      sx={{
        mt: 2,
        mb: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
        background:
          safeMode === "dark"
            ? theme.palette.grey[900]
            : theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        "&:hover": { boxShadow: theme.shadows[3] },
        transition: theme.transitions.create(["box-shadow"], {
          duration: theme.transitions.duration.short,
        }),
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
          borderBottom: `1px solid ${theme.palette.divider}`,
          background: alpha(
            safeMode === "dark" ? theme.palette.grey[800] : theme.palette.grey[50],
            0.5,
          ),
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
          {className ? className.replace("language-", "") : "code"}
        </Typography>

        <Stack direction="row" spacing={0.5}>
          <Tooltip title={copied ? "Copied" : "Copy"} arrow>
            <IconButton
              size="small"
              onClick={handleCopy}
              sx={toolbarButtonSx}
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
