"use client";

import EditIcon from "@mui/icons-material/Edit";
import LoadIcon from "@mui/icons-material/FolderOpen";
import NewIcon from "@mui/icons-material/Add";
import PreviewIcon from "@mui/icons-material/Preview";
import RedoIcon from "@mui/icons-material/Redo";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import SaveIcon from "@mui/icons-material/Save";
import UndoIcon from "@mui/icons-material/Undo";
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
            data-umami-event="writer-toolbar-new-click"
            disabled={!hasUnsavedChanges && !hasContent}
          >
            New
          </Button>
        </Tooltip>
        <Tooltip title="Load Entry">
          <Button
            startIcon={<LoadIcon />}
            onClick={onLoadDialog}
            data-umami-event="writer-toolbar-load-click"
          >
            Load
          </Button>
        </Tooltip>
        <Tooltip title="Save Entry (Ctrl+S)">
          <Button
            startIcon={<SaveIcon />}
            onClick={onSave}
            data-umami-event="writer-toolbar-save-click"
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
            data-umami-event="writer-toolbar-save-as-click"
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
            data-umami-event="writer-toolbar-undo-click"
            disabled={!canUndo || isPreview}
          >
            Undo
          </Button>
        </Tooltip>
        <Tooltip title="Redo (Ctrl+Shift+Z)">
          <Button
            startIcon={<RedoIcon />}
            onClick={onRedo}
            data-umami-event="writer-toolbar-redo-click"
            disabled={!canRedo || isPreview}
          >
            Redo
          </Button>
        </Tooltip>
        <Tooltip title="Toggle Preview">
          <Button
            startIcon={isPreview ? <EditIcon /> : <PreviewIcon />}
            onClick={onTogglePreview}
            data-umami-event="writer-toolbar-toggle-preview-click"
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
