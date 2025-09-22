"use client";

import {
  AspectRatio as AspectRatioIcon,
  Edit as EditIcon,
  Fullscreen as FullscreenIcon,
  FolderOpen as LoadIcon,
  Add as NewIcon,
  Preview as PreviewIcon,
  Redo as RedoIcon,
  SaveAs as SaveAsIcon,
  Save as SaveIcon,
  Undo as UndoIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import type { RefObject } from "react";
import { WriterContent } from "./WriterContent";

interface FocusModeProps {
  currentEntryTitle: string;
  hasUnsavedChanges: boolean;
  fullscreenFullWidth: boolean;
  isPreview: boolean;
  content: string;
  canUndo: boolean;
  canRedo: boolean;
  textFieldRef: RefObject<HTMLInputElement | null>;
  onToggleFullWidth: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  onExitFocus: () => void;
  onContentChange: (content: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onNewEntry: () => void;
  onLoadDialog: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onTogglePreview: () => void;
}

export function FocusMode({
  currentEntryTitle,
  hasUnsavedChanges,
  fullscreenFullWidth,
  isPreview,
  content,
  canUndo,
  canRedo,
  textFieldRef,
  onToggleFullWidth,
  onSave,
  onSaveAs,
  onExitFocus,
  onContentChange,
  onKeyDown,
  onNewEntry,
  onLoadDialog,
  onUndo,
  onRedo,
  onTogglePreview,
}: FocusModeProps) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Minimal Header for Focus Mode */}
      <Box
        sx={{
          p: 1,
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "background.paper",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Writer
          </Typography>
          {currentEntryTitle && (
            <Chip
              label={currentEntryTitle}
              variant="outlined"
              size="small"
              color="primary"
            />
          )}
          {hasUnsavedChanges && (
            <Chip
              label="Unsaved"
              variant="filled"
              size="small"
              color="warning"
            />
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Main Actions */}
          <ButtonGroup variant="outlined" size="small">
            <Tooltip title="New Entry">
              <Button
                startIcon={<NewIcon />}
                onClick={onNewEntry}
                disabled={!hasUnsavedChanges && !content.trim()}
                size="small"
              >
                New
              </Button>
            </Tooltip>
            <Tooltip title="Load Entry">
              <Button
                startIcon={<LoadIcon />}
                onClick={onLoadDialog}
                size="small"
              >
                Load
              </Button>
            </Tooltip>
          </ButtonGroup>

          {/* Editor Actions */}
          <ButtonGroup variant="outlined" size="small">
            <Tooltip title="Undo (Ctrl+Z)">
              <IconButton
                onClick={onUndo}
                disabled={!canUndo || isPreview}
                size="small"
              >
                <UndoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Redo (Ctrl+Shift+Z)">
              <IconButton
                onClick={onRedo}
                disabled={!canRedo || isPreview}
                size="small"
              >
                <RedoIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Toggle Preview">
              <IconButton
                onClick={onTogglePreview}
                disabled={!content.trim()}
                color={isPreview ? "primary" : "default"}
                size="small"
              >
                {isPreview ? <EditIcon /> : <PreviewIcon />}
              </IconButton>
            </Tooltip>
          </ButtonGroup>

          {/* Focus Mode Specific Actions */}
          <ButtonGroup variant="outlined" size="small">
            <Tooltip
              title={fullscreenFullWidth ? "Constrained Width" : "Full Width"}
            >
              <IconButton
                onClick={onToggleFullWidth}
                size="small"
                color={fullscreenFullWidth ? "primary" : "default"}
              >
                <AspectRatioIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save (Ctrl+S)">
              <IconButton
                onClick={onSave}
                disabled={!content.trim()}
                color={hasUnsavedChanges ? "primary" : "default"}
                size="small"
              >
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save As (Ctrl+Shift+S)">
              <IconButton
                onClick={onSaveAs}
                disabled={!content.trim()}
                size="small"
              >
                <SaveAsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Exit Focus Mode (F11)">
              <IconButton onClick={onExitFocus} size="small" color="primary">
                <FullscreenIcon />
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </Box>
      </Box>

      {/* Fullscreen Content Area */}
      <Box sx={{ flex: 1, overflow: "hidden", py: 1 }}>
        <WriterContent
          isPreview={isPreview}
          content={content}
          textFieldRef={textFieldRef}
          onContentChange={onContentChange}
          onKeyDown={onKeyDown}
          isFocusMode={true}
          fullscreenFullWidth={fullscreenFullWidth}
        />
      </Box>
    </Box>
  );
}
