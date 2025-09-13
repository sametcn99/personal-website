"use client";

import { useSearch } from "@/hooks/useSearch";
import { useSort } from "@/hooks/useSort";
import { useTabs } from "@/hooks/useTabs";
import Article from "@mui/icons-material/Article";
import Code from "@mui/icons-material/Code";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import BlogTab from "./BlogTab";
import GistsTab from "./GistsTab";

interface ContentTabsProps {
  gistPosts: ContentMetadata[];
  blogPosts: ContentMetadata[];
}

export default function ContentTabs({
  gistPosts,
  blogPosts,
}: ContentTabsProps) {
  // Separate hooks for each tab
  const gistsSearch = useSearch("gists");
  const gistsSort = useSort("gists");
  const blogSearch = useSearch("blog");
  const blogSort = useSort("blog");

  const { tabValue, setTabValue } = useTabs();

  return (
    <Box flex={{ xs: 1, md: "1 1 50%" }}>
      <Paper elevation={2} sx={{ p: 3 }} variant="outlined">
        {/* Tab Headers */}
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          variant="fullWidth"
          sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
        >
          <Tab
            label="Technical Gists"
            icon={<Code />}
            iconPosition="start"
            sx={{ textTransform: "none", fontWeight: "medium", flex: 1 }}
          />
          <Tab
            label="Blog"
            icon={<Article />}
            iconPosition="start"
            sx={{ textTransform: "none", fontWeight: "medium", flex: 1 }}
          />
        </Tabs>

        {/* Tab Panels */}
        {tabValue === 0 && (
          <GistsTab
            gistPosts={gistPosts}
            searchQuery={gistsSearch.searchQuery}
            setSearchQuery={gistsSearch.setSearchQuery}
            clearSearch={gistsSearch.clearSearch}
            sortBy={gistsSort.sortBy}
            setSortBy={gistsSort.setSortBy}
            sortOrder={gistsSort.sortOrder}
            setSortOrder={gistsSort.setSortOrder}
          />
        )}

        {tabValue === 1 && (
          <BlogTab
            blogPosts={blogPosts}
            searchQuery={blogSearch.searchQuery}
            setSearchQuery={blogSearch.setSearchQuery}
            clearSearch={blogSearch.clearSearch}
            sortBy={blogSort.sortBy}
            setSortBy={blogSort.setSortBy}
            sortOrder={blogSort.sortOrder}
            setSortOrder={blogSort.setSortOrder}
          />
        )}
      </Paper>
    </Box>
  );
}
