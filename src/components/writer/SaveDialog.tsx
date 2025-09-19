"use client";

import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface SaveDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string) => { success: boolean; error?: string };
  onSaveAs?: (title: string) => { success: boolean; error?: string };
  currentTitle?: string;
  isSaveAs?: boolean;
}

export function SaveDialog({
  isOpen,
  onClose,
  onSave,
  onSaveAs,
  currentTitle = "",
  isSaveAs = false,
}: SaveDialogProps) {
  const [title, setTitle] = useState(currentTitle);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      setError(null);

      const result =
        isSaveAs && onSaveAs ? onSaveAs(title.trim()) : onSave(title.trim());

      if (result.success) {
        onClose();
        setTitle("");
        setError(null);
      } else {
        setError(result.error || "An error occurred while saving");
      }
    }
  };

  const handleClose = () => {
    onClose();
    setTitle(currentTitle);
    setError(null);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isSaveAs ? "Save As" : "Save Entry"}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title for your entry..."
            variant="outlined"
            margin="normal"
            error={!!error}
            helperText={error}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={() =>
            handleSubmit({ preventDefault: () => {} } as React.FormEvent)
          }
          variant="contained"
          disabled={!title.trim()}
        >
          {isSaveAs ? "Save As" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
