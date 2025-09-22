"use client";

import { Box, Container, TextField, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
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
  // Ortak container sx styles
  const getContainerSx = (): SxProps<Theme> => {
    if (isFocusMode) {
      return {
        height: "100%",
        px: fullscreenFullWidth ? 0 : undefined,
      };
    }
    return {};
  };

  // Ortak field sx styles - hem textarea hem preview için
  const getFieldSx = (): SxProps<Theme> => {
    const baseSx: SxProps<Theme> = {
      height: "100%",
      "& .MuiInputBase-root": {
        height: "100%",
      },
      "& .MuiInputBase-input": {
        fontSize: isFocusMode ? "16px" : "14px",
        lineHeight: 1.6,
        height: "100% !important",
        overflow: "auto !important",
      },
      "& .MuiOutlinedInput-root": {
        borderRadius: isFocusMode ? 1 : 2,
        ...(!isFocusMode && {
          "&:hover": {
            borderColor: "primary.main",
          },
          "&.Mui-focused": {
            borderColor: "primary.main",
            boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
          },
        }),
      },
    };

    return baseSx;
  };

  // Preview için textarea'yı taklit eden box sx
  const getPreviewBoxSx = (): SxProps<Theme> => ({
    height: "100%",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: isFocusMode ? 1 : 2,
    padding: isFocusMode ? "16.5px 14px" : "16.5px 14px", // MUI TextField'ın default padding değerleri
    fontSize: isFocusMode ? "16px" : "14px",
    lineHeight: 1.6,
    overflow: "auto",
    position: "relative",
    "&:hover": !isPreview
      ? {
        borderColor: "primary.main",
      }
      : {},
  });

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

  // Empty state preview content
  const emptyStateContent = (
    <Box
      sx={
        {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          flexDirection: "column",
          gap: 2,
          color: "text.secondary",
        } satisfies SxProps<Theme>
      }
    >
      <Typography variant="h6">Nothing to preview</Typography>
      <Typography variant="body2">
        Write some markdown content first.
      </Typography>
    </Box>
  );

  // Main content wrapper - preview için textarea benzeri görünüm
  const contentWrapper = isPreview ? (
    <Box sx={getPreviewBoxSx()}>
      {content.trim() ? (
        <MarkdownPreview content={content} />
      ) : (
        emptyStateContent
      )}
    </Box>
  ) : (
    <TextField
      ref={textFieldRef}
      fullWidth
      multiline
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      variant="outlined"
      sx={getFieldSx()}
    />
  );

  // Focus mode için container
  if (isFocusMode) {
    return (
      <Container
        maxWidth={fullscreenFullWidth ? false : "md"}
        sx={getContainerSx()}
      >
        {contentWrapper}
      </Container>
    );
  }

  // Normal mode
  return contentWrapper;
}
