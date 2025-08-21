"use client";

import appData from "@/lib/app-data.json";
import { categoryOrder, socialMediaLinks } from "@/lib/social";
import AccessTime from "@mui/icons-material/AccessTime";
import ArrowDownward from "@mui/icons-material/ArrowDownward";
import ArrowUpward from "@mui/icons-material/ArrowUpward";
import Clear from "@mui/icons-material/Clear";
import Code from "@mui/icons-material/Code";
import Description from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Search from "@mui/icons-material/Search";
import SortByAlpha from "@mui/icons-material/SortByAlpha";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showAllLinks, setShowAllLinks] = useState(false);

  // Clear search function
  const clearSearch = () => setSearchQuery("");

  // Load sort preferences from localStorage on component mount
  useEffect(() => {
    const savedSortBy = localStorage.getItem("gist-sort-by") as
      | "title"
      | "date"
      | null;
    const savedSortOrder = localStorage.getItem("gist-sort-order") as
      | "asc"
      | "desc"
      | null;

    if (savedSortBy) {
      setSortBy(savedSortBy);
    }
    if (savedSortOrder) {
      setSortOrder(savedSortOrder);
    }
  }, []);

  // Save sort preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem("gist-sort-by", sortBy);
  }, [sortBy]);

  useEffect(() => {
    localStorage.setItem("gist-sort-order", sortOrder);
  }, [sortOrder]);

  // Handle ESC key press to clear search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && searchQuery) {
        clearSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchQuery]);

  const visibleLinks = socialMediaLinks
    .filter((link) => link.visible)
    .sort((a, b) => {
      // First, sort by category order
      const categoryOrderA = categoryOrder[a.category] || Number.MAX_VALUE;
      const categoryOrderB = categoryOrder[b.category] || Number.MAX_VALUE;

      if (categoryOrderA !== categoryOrderB) {
        return categoryOrderA - categoryOrderB;
      }

      // If categories have the same order, sort by label
      return a.label.localeCompare(b.label);
    });

  // Group links by category
  const linksByCategory = useMemo(() => {
    const grouped = visibleLinks.reduce(
      (acc, link) => {
        if (!acc[link.category]) {
          acc[link.category] = [];
        }
        acc[link.category].push(link);
        return acc;
      },
      {} as Record<string, typeof visibleLinks>,
    );

    return grouped;
  }, [visibleLinks]);

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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      py={4}
    >
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Social Media Links Section */}
          <Box flex={{ xs: 1, md: "1 1 50%" }}>
            <Paper
              elevation={2}
              sx={{ p: 3, height: "fit-content" }}
              variant="outlined"
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: "medium",
                }}
              >
                <OpenInNewIcon color="primary" />
                Links
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Connect with me on various platforms
              </Typography>

              {Object.entries(linksByCategory).map(([category, links]) => (
                <Box key={category} sx={{ mb: 3 }}>
                  <Chip
                    label={category}
                    size="small"
                    color="primary"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                  <List dense>
                    {links.map((link) => (
                      <ListItem disablePadding key={link.label}>
                        <ListItemButton
                          component="a"
                          href={link.link.toString()}
                          target={link.external ? "_blank" : "_self"}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          sx={{
                            borderRadius: 1,
                            mb: 0.5,
                            "&:hover": {
                              backgroundColor: "action.hover",
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {link.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={link.label}
                            slotProps={{
                              primary: {
                                fontSize: "0.9rem",
                              },
                            }}
                          />
                          {link.external && (
                            <OpenInNewIcon
                              sx={{ ml: 1 }}
                              fontSize="small"
                              color="action"
                            />
                          )}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}

              {/* See all links toggle */}
              <Box sx={{ mt: 2, textAlign: "left" }}>
                <Typography
                  variant="body2"
                  component="button"
                  onClick={() => setShowAllLinks(!showAllLinks)}
                  sx={{
                    color: "text.secondary",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    "&:hover": {
                      color: "text.primary",
                    },
                  }}
                >
                  {showAllLinks ? "hide" : "see all"}
                </Typography>
              </Box>

              {/* Hidden links when showing all */}
              {showAllLinks && (
                <Box
                  sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {socialMediaLinks
                      .filter((link) => !link.visible)
                      .sort((a, b) => a.label.localeCompare(b.label))
                      .map((link) => (
                        <Typography
                          key={link.label}
                          variant="body2"
                          component="a"
                          href={link.link.toString()}
                          target={link.external ? "_blank" : "_self"}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          sx={{
                            color: "text.secondary",
                            textDecoration: "none",
                            fontSize: "0.75rem",
                            "&:hover": {
                              color: "primary.main",
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {link.label}
                        </Typography>
                      ))}
                  </Box>
                </Box>
              )}
            </Paper>
          </Box>

          {/* Gists Section */}
          <Box flex={{ xs: 1, md: "1 1 50%" }}>
            <Paper elevation={2} sx={{ p: 3 }} variant="outlined">
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontWeight: "medium",
                }}
              >
                <Code color="primary" />
                Technical Gists
              </Typography>
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
                        <IconButton
                          size="small"
                          onClick={clearSearch}
                          edge="end"
                        >
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
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
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
                          secondary={new Date(
                            item.lastModified,
                          ).toLocaleDateString("tr-TR", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
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
            </Paper>
          </Box>
        </Box>

        {/* Footer */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            Last updated: {new Date().toLocaleDateString("tr-TR")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
