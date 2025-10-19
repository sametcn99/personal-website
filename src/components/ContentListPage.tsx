"use client";

import SortIcon from "@mui/icons-material/Sort";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import BackToHome from "@/components/BackToHome";
import Footer from "@/components/Footer";
import PostsList from "@/components/home/PostsList";
import SearchSection from "@/components/home/SearchSection";
import { useSearch } from "@/hooks/useSearch";
import { type SortBy, type SortOrder, useSort } from "@/hooks/useSort";

interface ContentListPageProps {
  title: string;
  description: string;
  posts: ContentMetadata[];
  searchKey: string;
}

export default function ContentListPage({
  title,
  description,
  posts,
  searchKey,
}: ContentListPageProps) {
  const { searchQuery, setSearchQuery, clearSearch } = useSearch(searchKey);
  const { sortBy, setSortBy, sortOrder, setSortOrder } = useSort(searchKey);

  const filteredAndSortedPosts = useMemo(() => {
    // First filter
    let filtered = posts;
    if (searchQuery.trim()) {
      filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.summary.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Then sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "title") {
        const comparison = a.title.localeCompare(b.title);
        return sortOrder === "asc" ? comparison : -comparison;
      } else {
        // Sort by date
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
    });

    return sorted;
  }, [searchQuery, posts, sortBy, sortOrder]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <BackToHome />

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            {title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "gray" }}>
            {description}
          </Typography>

          {/* Search and Sort Section */}
          <SearchSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            clearSearch={clearSearch}
            allPosts={posts}
            placeholder={`Search ${title.toLowerCase()}...`}
            showResults={false}
            resultCount={filteredAndSortedPosts.length}
            additionalControls={
              <Box sx={{ display: "flex", gap: 1, minWidth: { sm: "300px" } }}>
                <FormControl size="small" sx={{ minWidth: "120px" }}>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                    startAdornment={
                      <InputAdornment position="start">
                        <SortIcon fontSize="small" />
                      </InputAdornment>
                    }
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&::before": {
                        display: "none",
                      },
                      "&::after": {
                        display: "none",
                      },
                    }}
                  >
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: "120px" }}>
                  <Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                    sx={{
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                      },
                      "&::before": {
                        display: "none",
                      },
                      "&::after": {
                        display: "none",
                      },
                    }}
                  >
                    <MenuItem value="desc">
                      {sortBy === "date" ? "Newest First" : "Z → A"}
                    </MenuItem>
                    <MenuItem value="asc">
                      {sortBy === "date" ? "Oldest First" : "A → Z"}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            }
          />

          {/* Posts List */}
          {filteredAndSortedPosts.length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", py: 4 }}
            >
              No posts found{searchQuery ? ` for "${searchQuery}"` : ""}.
            </Typography>
          ) : (
            <PostsList posts={filteredAndSortedPosts} />
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
