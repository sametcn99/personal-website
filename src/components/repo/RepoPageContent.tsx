"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import BackToHome from "@/components/BackToHome";
import ContentListPage from "@/components/ContentListPage";
import { useReposStore } from "@/hooks/useReposStore";

/**
 * Renders repository list page from globally cached repositories state.
 */
export default function RepoPageContent() {
  const repos = useReposStore((state) => state.repos);
  const isLoading = useReposStore((state) => state.isLoading);
  const fetchRepos = useReposStore((state) => state.fetchRepos);

  useEffect(() => {
    void fetchRepos();
  }, [fetchRepos]);

  if (isLoading && repos.length === 0) {
    return (
      <Box>
        <Container maxWidth="md">
          <BackToHome />
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              py: 8,
            }}
          >
            <CircularProgress size={28} />
            <Typography variant="body2" color="text.secondary">
              Loading repositories...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <ContentListPage
      title="Repositories"
      description="A live list of my GitHub repositories."
      posts={repos}
      searchKey="repo"
    />
  );
}
