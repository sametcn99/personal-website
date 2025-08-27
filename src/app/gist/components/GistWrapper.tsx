"use client";

import BackToHome from "@/components/BackToHome";
import { Box, Container, Paper, Typography, alpha } from "@mui/material";
import ArticleNavigation from "./ArticleNavigation";
import ReadingTime from "./ReadingTime";
import ScrollProgress from "./ScrollProgress";
import ShareButton from "./ShareButton";

interface GistData {
  href: string;
  title: string;
  lastModified: string;
}

interface GistWrapperProps {
  children: React.ReactNode;
  currentGist?: GistData | null;
  prevGist?: GistData | null;
  nextGist?: GistData | null;
  postContent: string;
}

export default function GistWrapper({
  children,
  currentGist,
  prevGist,
  nextGist,
  postContent,
}: GistWrapperProps) {
  return (
    <Container maxWidth="lg">
      {/* Progress Bar */}
      <ScrollProgress />

      <Box sx={{ py: 2 }}>
        <BackToHome />

        {/* Article Meta */}
        {currentGist && (
          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
              backgroundColor: (theme) =>
                alpha(theme.palette.primary.main, 0.02),
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <ReadingTime>{postContent}</ReadingTime>
                <Typography variant="body2" color="text.secondary">
                  Last updated:{" "}
                  {new Date(currentGist.lastModified).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </Typography>
              </Box>

              {/* Share Button */}
              <ShareButton title={currentGist.title} />
            </Box>
          </Paper>
        )}

        {/* Main Content */}
        <Box component="main" sx={{ mb: 4 }}>
          {children}
        </Box>

        {/* Navigation between articles */}
        <ArticleNavigation prevGist={prevGist} nextGist={nextGist} />
      </Box>
    </Container>
  );
}
