"use client";

import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";

interface WriterEntry {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface LoadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onLoad: (entryId: string) => void;
  onDelete: (entryId: string) => void;
  entries: WriterEntry[];
}

export function LoadDialog({
  isOpen,
  onClose,
  onLoad,
  onDelete,
  entries,
}: LoadDialogProps) {
  const handleLoad = (entryId: string) => {
    onLoad(entryId);
    onClose();
  };

  const handleDelete = (entryId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete(entryId);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Load Entry</DialogTitle>
      <DialogContent>
        {entries.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No saved entries found
            </Typography>
          </Box>
        ) : (
          <List>
            {entries.map((entry) => (
              <ListItem
                key={entry.id}
                onClick={() => handleLoad(entry.id)}
                sx={{
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 1,
                  mb: 1,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemText
                  primary={entry.title}
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Created: {entry.createdAt.toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Updated: {entry.updatedAt.toLocaleDateString()}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        {entry.content.slice(0, 100)}
                        {entry.content.length > 100 ? "..." : ""}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={(e) => handleDelete(entry.id, e)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
