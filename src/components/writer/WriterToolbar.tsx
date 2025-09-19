"use client";

import {
  Edit as EditIcon,
  FolderOpen as LoadIcon,
  Add as NewIcon,
  Preview as PreviewIcon,
  Redo as RedoIcon,
  SaveAs as SaveAsIcon,
  Save as SaveIcon,
  Undo as UndoIcon,
} from "@mui/icons-material";
import { Box, Button, ButtonGroup, Tooltip } from "@mui/material";

interface WriterToolbarProps {
  isPreview: boolean;
  hasContent: boolean;
  hasUnsavedChanges: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onNewEntry: () => void;
  onLoadDialog: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onTogglePreview: () => void;
}

export function WriterToolbar({
  isPreview,
  hasContent,
  hasUnsavedChanges,
  canUndo,
  canRedo,
  onNewEntry,
  onLoadDialog,
  onSave,
  onSaveAs,
  onUndo,
  onRedo,
  onTogglePreview,
}: WriterToolbarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        justifyContent: "space-between",
      }}
    >
      {/* Main Actions */}
      <ButtonGroup variant="outlined" size="small">
        <Tooltip title="New Entry">
          <Button
            startIcon={<NewIcon />}
            onClick={onNewEntry}
            disabled={!hasUnsavedChanges && !hasContent}
          >
            New
          </Button>
        </Tooltip>
        <Tooltip title="Load Entry">
          <Button startIcon={<LoadIcon />} onClick={onLoadDialog}>
            Load
          </Button>
        </Tooltip>
        <Tooltip title="Save Entry (Ctrl+S)">
          <Button
            startIcon={<SaveIcon />}
            onClick={onSave}
            disabled={!hasContent}
            color={hasUnsavedChanges ? "primary" : "inherit"}
            variant={hasUnsavedChanges ? "contained" : "outlined"}
          >
            Save
          </Button>
        </Tooltip>
        <Tooltip title="Save As (Ctrl+Shift+S)">
          <Button
            startIcon={<SaveAsIcon />}
            onClick={onSaveAs}
            disabled={!hasContent}
          >
            Save As
          </Button>
        </Tooltip>
      </ButtonGroup>

      {/* Editor Actions */}
      <ButtonGroup variant="outlined" size="small">
        <Tooltip title="Undo (Ctrl+Z)">
          <Button
            startIcon={<UndoIcon />}
            onClick={onUndo}
            disabled={!canUndo || isPreview}
          >
            Undo
          </Button>
        </Tooltip>
        <Tooltip title="Redo (Ctrl+Shift+Z)">
          <Button
            startIcon={<RedoIcon />}
            onClick={onRedo}
            disabled={!canRedo || isPreview}
          >
            Redo
          </Button>
        </Tooltip>
        <Tooltip title="Toggle Preview">
          <Button
            startIcon={isPreview ? <EditIcon /> : <PreviewIcon />}
            onClick={onTogglePreview}
            disabled={!hasContent}
            variant={isPreview ? "contained" : "outlined"}
            color={isPreview ? "primary" : "inherit"}
          >
            {isPreview ? "Edit" : "Preview"}
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Box>
  );
}
