"use client";

import { Box, Container, TextField, Typography } from "@mui/material";
import type { RefObject } from "react";
import { MarkdownPreview } from "./MarkdownPreview";

interface WriterContentProps {
  isPreview: boolean;
  content: string;
  textFieldRef: RefObject<HTMLInputElement | null>;
  onContentChange: (content: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  isFocusMode?: boolean;
  fullscreenFullWidth?: boolean;
}

export function WriterContent({
  isPreview,
  content,
  textFieldRef,
  onContentChange,
  onKeyDown,
  isFocusMode = false,
  fullscreenFullWidth = false,
}: WriterContentProps) {
  if (isPreview) {
    const previewContent = (
      <Box
        sx={{
          height: "100%",
          overflow: "auto",
          ...(isFocusMode && { p: fullscreenFullWidth ? 2 : 0 }),
        }}
      >
        {content.trim() ? (
          <MarkdownPreview content={content} />
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: isFocusMode ? "50%" : "200px",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Nothing to preview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Write some markdown content first.
            </Typography>
          </Box>
        )}
      </Box>
    );

    if (isFocusMode) {
      return (
        <Container
          maxWidth={fullscreenFullWidth ? false : "md"}
          sx={{ height: "100%", px: fullscreenFullWidth ? 0 : undefined }}
        >
          {previewContent}
        </Container>
      );
    }

    return (
      <Box
        sx={{
          height: "100%",
          overflow: "auto",
          p: 3,
          borderRadius: 2,
        }}
      >
        {previewContent}
      </Box>
    );
  }

  const textFieldSx = isFocusMode
    ? {
        height: "100%",
        "& .MuiInputBase-root": {
          height: "100%",
        },
        "& .MuiInputBase-input": {
          fontFamily: 'Monaco, "Cascadia Code", "Roboto Mono", monospace',
          fontSize: "16px",
          lineHeight: 1.6,
          height: "100% !important",
          overflow: "auto !important",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: 1,
        },
      }
    : {
        height: "100%",
        "& .MuiInputBase-root": {
          height: "100%",
        },
        "& .MuiInputBase-input": {
          fontFamily: 'Monaco, "Cascadia Code", "Roboto Mono", monospace',
          fontSize: "14px",
          lineHeight: 1.6,
          height: "100% !important",
          overflow: "auto !important",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          "&:hover": {
            borderColor: "primary.main",
          },
          "&.Mui-focused": {
            borderColor: "primary.main",
            boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
          },
        },
      };

  const placeholder = isFocusMode
    ? "Start writing your markdown content here... (Press F11 to toggle fullscreen)"
    : `Start writing your markdown content here... (Press F11 for fullscreen focus mode)

Try some examples:
# Heading 1
## Heading 2
**Bold text**
*Italic text*
\`Code\`
- List item
1. Numbered list
> Blockquote`;

  const textField = (
    <TextField
      ref={textFieldRef}
      fullWidth
      multiline
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      variant="outlined"
      sx={textFieldSx}
    />
  );

  if (isFocusMode) {
    return (
      <Container
        maxWidth={fullscreenFullWidth ? false : "md"}
        sx={{ height: "100%", px: fullscreenFullWidth ? 0 : undefined }}
      >
        {textField}
      </Container>
    );
  }

  return textField;
}
