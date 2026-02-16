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

/**
 * Creates a stable Umami event name from a writer entry title.
 */
function getWriterEntryUmamiEventName(title: string): string {
  const normalizedTitle = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `writer-load-delete-${normalizedTitle || "entry"}-click`;
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
                    <Box component="span">
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        Created: {entry.createdAt.toLocaleDateString()}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: "block" }}
                      >
                        Updated: {entry.updatedAt.toLocaleDateString()}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5, display: "block" }}
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
                    data-umami-event={getWriterEntryUmamiEventName(entry.title)}
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
        <Button
          onClick={onClose}
          data-umami-event="writer-load-close-click"
          color="inherit"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
