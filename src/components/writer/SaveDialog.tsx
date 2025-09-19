"use client";

import {
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
  onSave: (title: string) => void;
  currentTitle?: string;
}

export function SaveDialog({
  isOpen,
  onClose,
  onSave,
  currentTitle = "",
}: SaveDialogProps) {
  const [title, setTitle] = useState(currentTitle);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title.trim());
      onClose();
      setTitle("");
    }
  };

  const handleClose = () => {
    onClose();
    setTitle(currentTitle);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Save Entry</DialogTitle>
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
          />
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
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
