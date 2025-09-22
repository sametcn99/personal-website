"use client";

import { Box, Collapse, Container, Divider } from "@mui/material";
import { useRef } from "react";
import { useWriter } from "../../hooks/useWriter";
import { FocusMode } from "./FocusMode";
import { LoadDialog } from "./LoadDialog";
import { SaveDialog } from "./SaveDialog";
import { WriterContent } from "./WriterContent";
import { WriterHeader } from "./WriterHeader";
import { WriterToolbar } from "./WriterToolbar";

export function WriterEditor() {
  const {
    content,
    isPreview,
    hasUnsavedChanges,
    entries,
    canUndo,
    canRedo,
    showSaveDialog,
    showSaveAsDialog,
    showLoadDialog,
    isHeaderCollapsed,
    focusMode,
    fullscreenFullWidth,
    saveEntry,
    saveAsEntry,
    loadEntry,
    deleteEntry,
    newEntry,
    togglePreview,
    updateContent,
    undo,
    redo,
    getCurrentEntryTitle,
    handleQuickSave,
    handleKeyDown,
    handleExitFocus,
    toggleHeaderCollapse,
    toggleFullscreenFullWidth,
    requestFullscreen,
    openSaveAsDialog,
    closeSaveDialog,
    closeSaveAsDialog,
    openLoadDialog,
    closeLoadDialog,
  } = useWriter();

  const textFieldRef = useRef<HTMLInputElement>(null);

  return (
    <Box
      component="main"
      role="application"
      aria-label="Markdown Editor Application"
      sx={{
        height: "100vh",
        overflow: "hidden",
        ...(focusMode && {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
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
          onToggleFullWidth={toggleFullscreenFullWidth}
          onSave={handleQuickSave}
          onSaveAs={openSaveAsDialog}
          onExitFocus={handleExitFocus}
          onContentChange={updateContent}
          onKeyDown={handleKeyDown}
          onNewEntry={newEntry}
          onLoadDialog={openLoadDialog}
          onUndo={undo}
          onRedo={redo}
          onTogglePreview={togglePreview}
        />
      ) : (
        <Container maxWidth="md" sx={{ height: "100vh", overflow: "auto" }}>
          <Box
            sx={{
              height: "calc(100vh - 10px)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                p: 2,
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
                  onToggleCollapse={toggleHeaderCollapse}
                  onToggleFullscreen={requestFullscreen}
                />

                <Collapse in={!isHeaderCollapsed}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <WriterToolbar
                      isPreview={isPreview}
                      hasContent={content.trim() !== ""}
                      hasUnsavedChanges={hasUnsavedChanges}
                      canUndo={canUndo}
                      canRedo={canRedo}
                      onNewEntry={newEntry}
                      onLoadDialog={openLoadDialog}
                      onSave={handleQuickSave}
                      onSaveAs={openSaveAsDialog}
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
        </Container>
      )}

      {/* Dialogs - Available in both normal and focus modes */}
      <SaveDialog
        isOpen={showSaveDialog}
        onClose={closeSaveDialog}
        onSave={saveEntry}
        currentTitle={getCurrentEntryTitle()}
      />

      <SaveDialog
        isOpen={showSaveAsDialog}
        onClose={closeSaveAsDialog}
        onSave={saveAsEntry}
        currentTitle=""
        isSaveAs={true}
      />

      <LoadDialog
        isOpen={showLoadDialog}
        onClose={closeLoadDialog}
        onLoad={loadEntry}
        onDelete={deleteEntry}
        entries={entries}
      />
    </Box>
  );
}
