"use client";

import ArticleNavigation from "@/components/ArticleNavigation";
import BackToHome from "@/components/BackToHome";
import ReadingTime from "@/components/ReadingTime";
import ScrollProgress from "@/components/ScrollProgress";
import ShareButton from "@/components/ShareButton";
import { Box, Container, Paper, Typography, alpha } from "@mui/material";

interface ArticleData {
  href: string;
  title: string;
  lastModified: string;
}

interface ArticleWrapperProps {
  children: React.ReactNode;
  currentArticle?: ArticleData | null;
  prevArticle?: ArticleData | null;
  nextArticle?: ArticleData | null;
  postContent: string;
  contentType: "post" | "gist";
  publishedLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
}

export default function ArticleWrapper({
  children,
  currentArticle,
  prevArticle,
  nextArticle,
  postContent,
  contentType,
  publishedLabel = "Published",
  prevLabel = "Previous",
  nextLabel = "Next",
}: ArticleWrapperProps) {
  return (
    <Container maxWidth="md">
      {/* Progress Bar */}
      <ScrollProgress />

      <Box sx={{ py: 2 }}>
        <BackToHome />

        {/* Article Meta */}
        {currentArticle && (
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
                  {publishedLabel}:{" "}
                  {new Date(currentArticle.lastModified).toLocaleDateString(
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
              <ShareButton
                title={currentArticle.title}
                contentType={contentType}
              />
            </Box>
          </Paper>
        )}

        {/* Main Content */}
        <Box component="main" sx={{ mb: 4 }}>
          {children}
        </Box>

        {/* Navigation between articles */}
        <ArticleNavigation
          prevArticle={prevArticle}
          nextArticle={nextArticle}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
        />
      </Box>
    </Container>
  );
}
