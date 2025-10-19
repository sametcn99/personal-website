"use client";

import Clear from "@mui/icons-material/Clear";
import Search from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ReactNode, useMemo } from "react";

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  allPosts: ContentMetadata[];
  placeholder?: string;
  showResults?: boolean;
  additionalControls?: ReactNode;
  resultCount?: number;
}

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  showClearButton?: boolean;
  placeholder?: string;
  additionalControls?: ReactNode;
}

interface SearchResultsProps {
  searchQuery: string;
  filteredPosts: ContentMetadata[];
}

interface SearchResultItemProps {
  post: ContentMetadata;
}

function SearchInput({
  searchQuery,
  setSearchQuery,
  clearSearch,
  showClearButton = false,
  placeholder = "Search blog posts, projects, and gists...",
  additionalControls,
}: SearchInputProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 2,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
          "& .MuiInputBase-root": {
            "&::before": {
              display: "none",
            },
            "&::after": {
              display: "none",
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
            endAdornment: showClearButton && searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={clearSearch} edge="end">
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      {additionalControls}
    </Box>
  );
}

function getContentType(href: string): string {
  if (href.includes("/blog/")) return "Blog";
  if (href.includes("/project/")) return "Project";
  return "Gist";
}

function SearchResultItem({ post }: SearchResultItemProps) {
  return (
    <Box
      component={Link}
      href={post.href}
      sx={{
        display: "block",
        mb: 3,
        textDecoration: "none",
        color: "inherit",
        "&:hover": { textDecoration: "underline" },
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
        {post.title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1, color: "gray" }}>
        {post.summary}
      </Typography>
      <Typography variant="caption" sx={{ color: "gray" }}>
        {new Date(post.publishedAt).toLocaleDateString()} •{" "}
        {getContentType(post.href)}
      </Typography>
    </Box>
  );
}

function SearchResultsHeader({
  searchQuery,
  count,
}: {
  searchQuery: string;
  count: number;
}) {
  if (!searchQuery) return null;

  return (
    <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
      {count} result{count !== 1 ? "s" : ""} found
      {count === 0 && ` for "${searchQuery}"`}
    </Typography>
  );
}

function SearchResults({ searchQuery, filteredPosts }: SearchResultsProps) {
  if (!searchQuery) return null;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Search Results ({filteredPosts.length})
      </Typography>
      {filteredPosts.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No results found for &quot;{searchQuery}&quot;
        </Typography>
      ) : (
        <Box>
          {filteredPosts.map((post) => (
            <SearchResultItem key={post.href} post={post} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default function SearchSection({
  searchQuery,
  setSearchQuery,
  clearSearch,
  allPosts,
  placeholder,
  showResults = true,
  additionalControls,
  resultCount,
}: SearchSectionProps) {
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return allPosts
      .filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.summary.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .slice(0, 10); // Limit to 10 results
  }, [searchQuery, allPosts]);

  const displayResultCount =
    resultCount !== undefined ? resultCount : filteredPosts.length;

  return (
    <Box sx={{ mb: showResults ? 6 : 4 }}>
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        clearSearch={clearSearch}
        showClearButton={!!searchQuery}
        placeholder={placeholder}
        additionalControls={additionalControls}
      />
      {showResults ? (
        <SearchResults
          searchQuery={searchQuery}
          filteredPosts={filteredPosts}
        />
      ) : (
        <SearchResultsHeader
          searchQuery={searchQuery}
          count={displayResultCount}
        />
      )}
    </Box>
  );
}

export { SearchInput, SearchResultsHeader };
