"use client";

import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Fullscreen as FullscreenIcon,
} from "@mui/icons-material";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";

interface WriterHeaderProps {
  currentEntryTitle: string;
  hasUnsavedChanges: boolean;
  isHeaderCollapsed: boolean;
  focusMode: boolean;
  onToggleCollapse: () => void;
  onToggleFullscreen: () => void;
}

export function WriterHeader({
  currentEntryTitle,
  hasUnsavedChanges,
  isHeaderCollapsed,
  focusMode,
  onToggleCollapse,
  onToggleFullscreen,
}: WriterHeaderProps) {
  return (
    <Box
      component="header"
      role="banner"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 600 }}
          aria-label="Writer - Markdown Editor"
        >
          Writer
        </Typography>
        {currentEntryTitle && (
          <Chip
            label={currentEntryTitle}
            variant="outlined"
            size="small"
            color="primary"
            aria-label={`Current document: ${currentEntryTitle}`}
          />
        )}
        {hasUnsavedChanges && (
          <Chip
            label="Unsaved"
            variant="filled"
            size="small"
            color="warning"
            aria-label="Unsaved changes"
          />
        )}
      </Box>

      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
        role="toolbar"
        aria-label="Editor tools"
      >
        <Tooltip title="Focus Mode (F11)">
          <IconButton
            onClick={onToggleFullscreen}
            size="small"
            color={focusMode ? "primary" : "default"}
            aria-label="Toggle focus mode"
            aria-pressed={focusMode}
          >
            <FullscreenIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title={isHeaderCollapsed ? "Show Controls" : "Hide Controls"}>
          <IconButton
            onClick={onToggleCollapse}
            size="small"
            aria-label={isHeaderCollapsed ? "Show controls" : "Hide controls"}
            aria-expanded={!isHeaderCollapsed}
          >
            {isHeaderCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
