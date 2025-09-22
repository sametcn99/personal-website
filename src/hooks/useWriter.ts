"use client";

import { useCallback, useEffect, useState } from "react";

interface WriterEntry {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const STORAGE_KEY = "writer-entries";

export function useWriter() {
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
  const [entries, setEntries] = useState<WriterEntry[]>([]);

  // Undo/Redo history
  const [history, setHistory] = useState<string[]>([""]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Dialog states
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showSaveAsDialog, setShowSaveAsDialog] = useState(false);
  const [showLoadDialog, setShowLoadDialog] = useState(false);

  // UI states
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [fullscreenFullWidth, setFullscreenFullWidth] = useState(false);

  // Load entries from localStorage on mount
  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem(STORAGE_KEY);
      if (savedEntries) {
        const parsedEntries = JSON.parse(savedEntries).map(
          (
            entry: Omit<WriterEntry, "createdAt" | "updatedAt"> & {
              createdAt: string;
              updatedAt: string;
            },
          ) => ({
            ...entry,
            createdAt: new Date(entry.createdAt),
            updatedAt: new Date(entry.updatedAt),
          }),
        );
        setEntries(parsedEntries);
      }
    } catch (error) {
      console.error("Error loading entries from localStorage:", error);
    }
  }, []);

  // Track unsaved changes and add beforeunload listener
  useEffect(() => {
    if (currentEntryId) {
      const currentEntry = entries.find((entry) => entry.id === currentEntryId);
      setHasUnsavedChanges(
        currentEntry ? currentEntry.content !== content : content.trim() !== "",
      );
    } else {
      setHasUnsavedChanges(content.trim() !== "");
    }
  }, [content, currentEntryId, entries]);

  // Add beforeunload event listener for unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
        return "You have unsaved changes. Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

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

  const saveToLocalStorage = useCallback((entriesToSave: WriterEntry[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entriesToSave));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, []);

  const saveEntry = useCallback(
    (title?: string): { success: boolean; error?: string } => {
      if (!content.trim()) return { success: false, error: "Content is empty" };

      const now = new Date();
      const entryTitle = title || `Entry ${new Date().toLocaleDateString()}`;

      // Check for duplicate titles (excluding current entry)
      const existingEntry = entries.find(
        (entry) => entry.title === entryTitle && entry.id !== currentEntryId,
      );
      if (existingEntry) {
        return {
          success: false,
          error: "An entry with this title already exists",
        };
      }

      if (currentEntryId) {
        // Update existing entry
        const updatedEntries = entries.map((entry) =>
          entry.id === currentEntryId
            ? { ...entry, content, title: entryTitle, updatedAt: now }
            : entry,
        );
        setEntries(updatedEntries);
        saveToLocalStorage(updatedEntries);
      } else {
        // Create new entry
        const newEntry: WriterEntry = {
          id: Date.now().toString(),
          title: entryTitle,
          content,
          createdAt: now,
          updatedAt: now,
        };
        const updatedEntries = [...entries, newEntry];
        setEntries(updatedEntries);
        setCurrentEntryId(newEntry.id);
        saveToLocalStorage(updatedEntries);
      }

      setHasUnsavedChanges(false);
      return { success: true };
    },
    [content, currentEntryId, entries, saveToLocalStorage],
  );

  const saveAsEntry = useCallback(
    (title: string): { success: boolean; error?: string } => {
      if (!content.trim()) return { success: false, error: "Content is empty" };

      // Check for duplicate titles
      const existingEntry = entries.find((entry) => entry.title === title);
      if (existingEntry) {
        return {
          success: false,
          error: "An entry with this title already exists",
        };
      }

      const now = new Date();
      const newEntry: WriterEntry = {
        id: Date.now().toString(),
        title,
        content,
        createdAt: now,
        updatedAt: now,
      };

      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries);
      setCurrentEntryId(newEntry.id);
      saveToLocalStorage(updatedEntries);
      setHasUnsavedChanges(false);

      return { success: true };
    },
    [content, entries, saveToLocalStorage],
  );

  const loadEntry = useCallback(
    (entryId: string) => {
      const entry = entries.find((e) => e.id === entryId);
      if (entry) {
        setContent(entry.content);
        setCurrentEntryId(entryId);
        setHasUnsavedChanges(false);
        setIsPreview(false);
        // Reset history for loaded content
        setHistory([entry.content]);
        setHistoryIndex(0);
      }
    },
    [entries],
  );

  const deleteEntry = useCallback(
    (entryId: string) => {
      const updatedEntries = entries.filter((entry) => entry.id !== entryId);
      setEntries(updatedEntries);
      saveToLocalStorage(updatedEntries);

      if (currentEntryId === entryId) {
        setCurrentEntryId(null);
        setContent("");
        setHasUnsavedChanges(false);
      }
    },
    [entries, currentEntryId, saveToLocalStorage],
  );

  const newEntry = useCallback(() => {
    setContent("");
    setCurrentEntryId(null);
    setHasUnsavedChanges(false);
    setIsPreview(false);
    // Reset history for new entry
    setHistory([""]);
    setHistoryIndex(0);
  }, []);

  const togglePreview = useCallback(() => {
    setIsPreview((prev) => !prev);
  }, []);

  const updateContent = useCallback(
    (newContent: string) => {
      setContent(newContent);

      // Add to history for undo/redo
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(newContent);
        // Keep only last 50 entries
        if (newHistory.length > 50) {
          newHistory.shift();
          return newHistory;
        }
        return newHistory;
      });
      setHistoryIndex((prev) => Math.min(prev + 1, 49));
    },
    [historyIndex],
  );

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setContent(history[newIndex]);
    }
  }, [history, historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Helper functions
  const getCurrentEntryTitle = useCallback(() => {
    if (currentEntryId) {
      const entry = entries.find((e) => e.id === currentEntryId);
      return entry?.title || "";
    }
    return "";
  }, [currentEntryId, entries]);

  const handleQuickSave = useCallback(() => {
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
  }, [currentEntryId, entries, saveEntry]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      // Ctrl+S for save
      if (e.ctrlKey && e.key === "s" && !e.shiftKey) {
        e.preventDefault();
        handleQuickSave();
      }
      // Ctrl+Shift+S for save as
      else if (e.ctrlKey && e.shiftKey && e.key === "S") {
        e.preventDefault();
        setShowSaveAsDialog(true);
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
    },
    [handleQuickSave, undo, redo],
  );

  const handleExitFocus = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      setFocusMode(false);
    }
  }, []);

  // UI state handlers
  const toggleHeaderCollapse = useCallback(() => {
    setIsHeaderCollapsed(!isHeaderCollapsed);
  }, [isHeaderCollapsed]);

  const toggleFullscreenFullWidth = useCallback(() => {
    setFullscreenFullWidth(!fullscreenFullWidth);
  }, [fullscreenFullWidth]);

  const requestFullscreen = useCallback(() => {
    document.documentElement.requestFullscreen();
  }, []);

  // Dialog handlers
  const openSaveDialog = useCallback(() => setShowSaveDialog(true), []);
  const closeSaveDialog = useCallback(() => setShowSaveDialog(false), []);
  const openSaveAsDialog = useCallback(() => setShowSaveAsDialog(true), []);
  const closeSaveAsDialog = useCallback(() => setShowSaveAsDialog(false), []);
  const openLoadDialog = useCallback(() => setShowLoadDialog(true), []);
  const closeLoadDialog = useCallback(() => setShowLoadDialog(false), []);

  return {
    // State
    content,
    isPreview,
    hasUnsavedChanges,
    currentEntryId,
    entries,
    canUndo,
    canRedo,
    showSaveDialog,
    showSaveAsDialog,
    showLoadDialog,
    isHeaderCollapsed,
    focusMode,
    fullscreenFullWidth,

    // Actions
    saveEntry,
    saveAsEntry,
    loadEntry,
    deleteEntry,
    newEntry,
    togglePreview,
    updateContent,
    undo,
    redo,

    // Helper functions
    getCurrentEntryTitle,
    handleQuickSave,
    handleKeyDown,
    handleExitFocus,

    // UI state handlers
    toggleHeaderCollapse,
    toggleFullscreenFullWidth,
    requestFullscreen,

    // Dialog handlers
    openSaveDialog,
    closeSaveDialog,
    openSaveAsDialog,
    closeSaveAsDialog,
    openLoadDialog,
    closeLoadDialog,
  };
}
