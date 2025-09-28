import type { SortBy, SortOrder } from "@/hooks/useSort";
import AccessTime from "@mui/icons-material/AccessTime";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import Clear from "@mui/icons-material/Clear";
import Language from "@mui/icons-material/Language";
import Search from "@mui/icons-material/Search";
import SortByAlpha from "@mui/icons-material/SortByAlpha";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useMemo } from "react";

interface BlogTabProps {
  blogPosts: ContentMetadata[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  sortBy: SortBy;
  setSortBy: (sortBy: SortBy) => void;
  sortOrder: SortOrder;
  setSortOrder: (sortOrder: SortOrder) => void;
}

export default function BlogTab({
  blogPosts,
  searchQuery,
  setSearchQuery,
  clearSearch,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: BlogTabProps) {
  // Use blog posts from props
  const blogData = useMemo(() => blogPosts, [blogPosts]);

  // Filter and sort blog posts based on search query and sort options
  const filteredBlogs = useMemo(() => {
    const filtered = searchQuery.trim()
      ? blogData.filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [...blogData];

    // Sort the filtered results
    return filtered.sort((a, b) => {
      if (sortBy === "title") {
        const comparison = a.title.localeCompare(b.title);
        return sortOrder === "asc" ? comparison : -comparison;
      } else {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        const comparison = dateA - dateB;
        return sortOrder === "asc" ? comparison : -comparison;
      }
    });
  }, [searchQuery, sortBy, sortOrder, blogData]);

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Personal thoughts, experiences, and insights
      </Typography>

      {/* Search Field */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search blog posts..."
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
            {filteredBlogs.length} of {blogData.length} blog posts found
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {filteredBlogs.length} blog posts
          </Typography>
        )}
      </Box>

      {/* Blog List */}
      <List>
        {filteredBlogs.length === 0 && searchQuery ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={4}
          >
            <Typography variant="body2" color="text.secondary">
              No blog posts found for &quot;{searchQuery}&quot;
            </Typography>
          </Box>
        ) : filteredBlogs.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={4}
          >
            <Typography variant="body2" color="text.secondary">
              No blog posts found.
            </Typography>
          </Box>
        ) : (
          filteredBlogs.map((item) => (
            <ListItem disablePadding key={item.title}>
              <ListItemButton
                component={Link}
                href={item.href}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <ListItemText
                  primary={item.title}
                  secondary={
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1, fontSize: "0.85rem" }}
                      >
                        {item.summary}
                      </Typography>
                      <Typography variant="caption" display="block">
                        {new Date(item.publishedAt).toLocaleDateString(
                          "tr-TR",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Language fontSize="small" />
                          <Typography variant="caption">
                            {item.language?.toUpperCase()}
                          </Typography>
                        </Box>
                        {item.tags?.length && item.tags.length > 0 && (
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={0.5}
                            flexWrap="wrap"
                          >
                            {item.tags.slice(0, 3).map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{
                                  height: 16,
                                  fontSize: "0.6rem",
                                  "& .MuiChip-label": { px: 0.5 },
                                }}
                              />
                            ))}
                            {item.tags.length > 3 && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                +{item.tags.length - 3}
                              </Typography>
                            )}
                          </Box>
                        )}
                      </Box>
                    </Box>
                  }
                  slotProps={{
                    primary: {
                      fontSize: "0.9rem",
                      fontWeight: "medium",
                    },
                    // Render secondary Typography wrapper as a div to avoid invalid <p><div/></p> nesting
                    secondary: {
                      component: "div",
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
