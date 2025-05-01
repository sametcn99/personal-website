import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { searchGists, SearchResult } from '@/lib/search';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Code from '@mui/icons-material/Code';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<SearchResult[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus search input when modal opens
  React.useEffect(() => {
    if (open && inputRef.current) {
      // Use a small timeout to ensure the input is rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Handle search input
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    
    // Search gists
    const searchResults = searchGists(value);
    setResults(searchResults);
  };

  // Handle click on a search result
  const handleResultClick = (href: string) => {
    window.location.href = href;
    onClose();
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      onKeyDown={handleKeyDown}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <SearchIcon sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Search Gists
          </Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          inputRef={inputRef}
          margin="dense"
          fullWidth
          value={query}
          onChange={handleSearch}
          placeholder="Type to search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        
        {/* Results */}
        {query && (
          <List sx={{ mt: 2 }}>
            {results.length > 0 ? (
              results.map((result) => (
                <ListItem key={result.href} disablePadding>
                  <ListItemButton onClick={() => handleResultClick(result.href)}>
                    <ListItemText 
                      primary={result.title}
                      secondary={new Date(result.lastModified).toLocaleDateString()}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Box display="flex" flexDirection="column" alignItems="center" py={3}>
                <Code fontSize="large" color="disabled" />
                <Typography color="text.secondary" mt={1}>
                  No results found
                </Typography>
              </Box>
            )}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
}
