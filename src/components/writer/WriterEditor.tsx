"use client";

import { Box, Collapse, Container, Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useWriter } from "../../hooks/useWriter";
import { FocusMode } from "./FocusMode";
import { LoadDialog } from "./LoadDialog";
import { SaveDialog } from "./SaveDialog";
import { WriterContent } from "./WriterContent";
import { WriterHeader } from "./WriterHeader";
import { WriterStatusAlerts } from "./WriterStatusAlerts";
import { WriterToolbar } from "./WriterToolbar";

export function WriterEditor() {
  const {
    content,
    isPreview,
    hasUnsavedChanges,
    currentEntryId,
    entries,
    canUndo,
    canRedo,
    saveEntry,
    loadEntry,
    deleteEntry,
    newEntry,
    togglePreview,
    updateContent,
    undo,
    redo,
  } = useWriter();

  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [fullscreenFullWidth, setFullscreenFullWidth] = useState(false);
  const textFieldRef = useRef<HTMLInputElement>(null);

  // Fullscreen detection and F11 handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement !== null;
      setFocusMode(isFullscreen);
      if (isFullscreen) {
        setIsHeaderCollapsed(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F11") {
        e.preventDefault();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          document.exitFullscreen();
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getCurrentEntryTitle = () => {
    if (currentEntryId) {
      const entry = entries.find((e) => e.id === currentEntryId);
      return entry?.title || "";
    }
    return "";
  };

  const handleQuickSave = () => {
    if (currentEntryId) {
      // Update existing entry with same title
      const currentEntry = entries.find((e) => e.id === currentEntryId);
      if (currentEntry) {
        saveEntry(currentEntry.title);
      }
    } else {
      // Show dialog for new entry
      setShowSaveDialog(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+S for save
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      handleQuickSave();
    }
    // Ctrl+Z for undo
    else if (e.ctrlKey && !e.shiftKey && e.key === "z") {
      e.preventDefault();
      undo();
    }
    // Ctrl+Shift+Z or Ctrl+Y for redo
    else if (
      (e.ctrlKey && e.shiftKey && e.key === "Z") ||
      (e.ctrlKey && e.key === "y")
    ) {
      e.preventDefault();
      redo();
    }
  };

  const handleExitFocus = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      setFocusMode(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
        ...(focusMode && {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
        }),
      }}
    >
      {focusMode ? (
        <FocusMode
          currentEntryTitle={getCurrentEntryTitle()}
          hasUnsavedChanges={hasUnsavedChanges}
          fullscreenFullWidth={fullscreenFullWidth}
          isPreview={isPreview}
          content={content}
          canUndo={canUndo}
          canRedo={canRedo}
          textFieldRef={textFieldRef}
          onToggleFullWidth={() => setFullscreenFullWidth(!fullscreenFullWidth)}
          onSave={handleQuickSave}
          onExitFocus={handleExitFocus}
          onContentChange={updateContent}
          onKeyDown={handleKeyDown}
          onNewEntry={newEntry}
          onLoadDialog={() => setShowLoadDialog(true)}
          onUndo={undo}
          onRedo={redo}
          onTogglePreview={togglePreview}
        />
      ) : (
        <Container
          maxWidth="md"
          sx={{ py: 2, height: "100vh", overflow: "auto" }}
        >
          <Box
            sx={{
              height: "calc(100vh - 32px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                p: 3,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              {/* Header Section */}
              <Box sx={{ mb: 2 }}>
                <WriterHeader
                  currentEntryTitle={getCurrentEntryTitle()}
                  hasUnsavedChanges={hasUnsavedChanges}
                  isHeaderCollapsed={isHeaderCollapsed}
                  focusMode={focusMode}
                  onToggleCollapse={() =>
                    setIsHeaderCollapsed(!isHeaderCollapsed)
                  }
                  onToggleFullscreen={() =>
                    document.documentElement.requestFullscreen()
                  }
                />

                <Collapse in={!isHeaderCollapsed}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <WriterStatusAlerts hasUnsavedChanges={hasUnsavedChanges} />

                    <WriterToolbar
                      isPreview={isPreview}
                      hasContent={content.trim() !== ""}
                      hasUnsavedChanges={hasUnsavedChanges}
                      canUndo={canUndo}
                      canRedo={canRedo}
                      onNewEntry={newEntry}
                      onLoadDialog={() => setShowLoadDialog(true)}
                      onSave={handleQuickSave}
                      onUndo={undo}
                      onRedo={redo}
                      onTogglePreview={togglePreview}
                    />
                  </Box>
                </Collapse>

                <Divider sx={{ mt: 2 }} />
              </Box>

              {/* Content Area - Normal Mode */}
              <Box sx={{ flex: 1, overflow: "hidden" }}>
                <WriterContent
                  isPreview={isPreview}
                  content={content}
                  textFieldRef={textFieldRef}
                  onContentChange={updateContent}
                  onKeyDown={handleKeyDown}
                />
              </Box>
            </Box>
          </Box>

          <SaveDialog
            isOpen={showSaveDialog}
            onClose={() => setShowSaveDialog(false)}
            onSave={saveEntry}
            currentTitle={getCurrentEntryTitle()}
          />

          <LoadDialog
            isOpen={showLoadDialog}
            onClose={() => setShowLoadDialog(false)}
            onLoad={loadEntry}
            onDelete={deleteEntry}
            entries={entries}
          />
        </Container>
      )}
    </Box>
  );
}
