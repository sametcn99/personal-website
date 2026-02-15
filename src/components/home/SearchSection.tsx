"use client";

import Clear from "@mui/icons-material/Clear";
import Search from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { type ReactNode, useEffect, useMemo, useRef } from "react";
import { useReposStore } from "@/hooks/useReposStore";

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

/**
 * Checks whether the event target is an editable element.
 */
function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const tagName = target.tagName.toLowerCase();
  return (
    target.isContentEditable ||
    tagName === "input" ||
    tagName === "textarea" ||
    tagName === "select"
  );
}

/**
 * Determines whether a key should trigger global search typing.
 */
function isSearchTriggerKey(event: KeyboardEvent): boolean {
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return false;
  }

  return event.key.length === 1 || event.key === "Backspace";
}

function SearchInput({
  searchQuery,
  setSearchQuery,
  clearSearch,
  showClearButton = false,
  placeholder = "Search blog posts, projects, gists, and links...",
  additionalControls,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchQueryRef = useRef(searchQuery);

  useEffect(() => {
    searchQueryRef.current = searchQuery;
  }, [searchQuery]);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (!isSearchTriggerKey(event) || isEditableTarget(event.target)) {
        return;
      }

      inputRef.current?.focus();

      if (event.key === "Backspace") {
        if (searchQueryRef.current.length > 0) {
          event.preventDefault();
          setSearchQuery(searchQueryRef.current.slice(0, -1));
        }
        return;
      }

      event.preventDefault();
      setSearchQuery(`${searchQueryRef.current}${event.key}`);
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [setSearchQuery]);

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
        size="medium"
        placeholder={placeholder}
        value={searchQuery}
        inputRef={inputRef}
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
                <IconButton
                  size="small"
                  onClick={clearSearch}
                  edge="end"
                  data-umami-event="search-clear-click"
                >
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
  if (href.includes("/link/")) return "Link";
  if (href.includes("/repo/")) return "Repository";
  return "Gist";
}

/**
 * Formats optional ISO date values for UI output.
 */
function formatOptionalDate(value?: string): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toDateString();
}

function SearchResultItem({ post }: SearchResultItemProps) {
  const isRepoResult = post.href.startsWith("/repo/");

  return (
    <Box
      component={Link}
      href={post.href}
      data-umami-event="search-result-click"
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
      {isRepoResult ? (
        <Typography variant="caption" sx={{ color: "gray" }}>
          Created: {formatOptionalDate(post.createdAt || post.publishedAt)}
          {" • "}
          Updated: {formatOptionalDate(post.updatedAt || post.publishedAt)}
          {" • "}
          Repository
        </Typography>
      ) : (
        <Typography variant="caption" sx={{ color: "gray" }}>
          {new Date(post.publishedAt).toLocaleDateString()} •{" "}
          {getContentType(post.href)}
        </Typography>
      )}
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
  const repoPosts = useReposStore((state) => state.repos);
  const isRepoLoading = useReposStore((state) => state.isLoading);
  const hasFetchedRepos = useReposStore((state) => state.hasFetched);
  const fetchRepos = useReposStore((state) => state.fetchRepos);

  useEffect(() => {
    const normalizedQuery = searchQuery.trim();

    if (normalizedQuery.length !== 1 || hasFetchedRepos) {
      return;
    }
    void fetchRepos();
  }, [searchQuery, hasFetchedRepos, fetchRepos]);

  const searchablePosts = useMemo(() => {
    if (repoPosts.length === 0) {
      return allPosts;
    }

    const mergedByHref = new Map<string, ContentMetadata>();
    for (const post of [...allPosts, ...repoPosts]) {
      mergedByHref.set(post.href, post);
    }

    return Array.from(mergedByHref.values());
  }, [allPosts, repoPosts]);

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return searchablePosts
      .filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.summary.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .slice(0, 10); // Limit to 10 results
  }, [searchQuery, searchablePosts]);

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
      {searchQuery.trim() && isRepoLoading ? (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ mb: 2, color: "text.secondary" }}
        >
          <CircularProgress size={16} />
          <Typography variant="body2">Loading repositories...</Typography>
        </Stack>
      ) : null}
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
