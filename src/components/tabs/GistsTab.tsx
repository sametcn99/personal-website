import { SortBy, SortOrder } from "@/hooks/useSort";
import appData from "@/lib/app-data.json";
import AccessTime from "@mui/icons-material/AccessTime";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import Clear from "@mui/icons-material/Clear";
import Code from "@mui/icons-material/Code";
import Description from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import Search from "@mui/icons-material/Search";
import SortByAlpha from "@mui/icons-material/SortByAlpha";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";

interface GistsTabProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
}

export default function GistsTab({
  searchQuery,
  setSearchQuery,
  clearSearch,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: GistsTabProps) {
  // Filter and sort gists based on search query and sort options
  const filteredGists = useMemo(() => {
    const filtered = searchQuery.trim()
      ? appData.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [...appData];

    // Sort the filtered results
    return filtered.sort((a, b) => {
      if (sortBy === "title") {
        const comparison = a.title.localeCompare(b.title);
        return sortOrder === "asc" ? comparison : -comparison;
      } else {
        const dateA = new Date(a.lastModified).getTime();
        const dateB = new Date(b.lastModified).getTime();
        const comparison = dateA - dateB;
        return sortOrder === "asc" ? comparison : -comparison;
      }
    });
  }, [searchQuery, sortBy, sortOrder]);

  // Function to render an icon based on the title
  const getIconForItem = (title: string) => {
    if (title === "Home") return <HomeIcon />;
    if (title === "CV") return <Description />;
    return <Code />; // Default icon for gists
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Collection of useful code snippets and documentation
      </Typography>

      {/* Search Field */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search gists..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
        suppressHydrationWarning
        slotProps={{
          htmlInput: {
            spellCheck: false,
            "data-ms-editor": false,
          },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={clearSearch} edge="end">
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Sort Controls */}
      <Box display="flex" gap={1} mb={2} alignItems="center">
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ minWidth: "fit-content" }}
        >
          Sort by:
        </Typography>
        <ToggleButtonGroup
          value={sortBy}
          exclusive
          onChange={(_, newSortBy) => newSortBy && setSortBy(newSortBy)}
          size="small"
        >
          <ToggleButton value="title" sx={{ py: 0.5, px: 1 }}>
            <SortByAlpha fontSize="small" sx={{ mr: 0.5 }} />
            Title
          </ToggleButton>
          <ToggleButton value="date" sx={{ py: 0.5, px: 1 }}>
            <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
            Date
          </ToggleButton>
        </ToggleButtonGroup>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Tooltip
            title={`Click to sort ${sortOrder === "asc" ? "descending" : "ascending"}`}
            arrow
          >
            <IconButton
              size="small"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? (
                <ArrowUpward fontSize="small" />
              ) : (
                <ArrowDownward fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Results info */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        {searchQuery ? (
          <Typography variant="body2" color="text.secondary">
            {filteredGists.length} of {appData.length} gists found
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {filteredGists.length} gists
          </Typography>
        )}
      </Box>

      {/* Gists List */}
      <List>
        {filteredGists.length === 0 && searchQuery ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={4}
          >
            <Typography variant="body2" color="text.secondary">
              No gists found for &quot;{searchQuery}&quot;
            </Typography>
          </Box>
        ) : (
          filteredGists.map((item) => (
            <ListItem disablePadding key={item.title}>
              <ListItemButton
                component="a"
                href={item.href}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {getIconForItem(item.title)}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={new Date(item.lastModified).toLocaleDateString(
                    "tr-TR",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )}
                  slotProps={{
                    primary: {
                      fontSize: "0.9rem",
                      fontWeight: "medium",
                    },
                    secondary: {
                      fontSize: "0.75rem",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}
