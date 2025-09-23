"use client";

import ArticleNavigation from "@/components/ArticleNavigation";
import BackToHome from "@/components/BackToHome";
import ReadingTime from "@/components/ReadingTime";
import ScrollProgress from "@/components/ScrollProgress";
import ShareButton from "@/components/ShareButton";
import { Box, Chip, Container, Paper, Typography } from "@mui/material";

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
  contentType: "post" | "gist";
  publishedLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  tags?: string[];
  language?: string;
}

export default function ArticleWrapper({
  children,
  currentArticle,
  prevArticle,
  nextArticle,
  contentType,
  publishedLabel = "Published",
  prevLabel = "Previous",
  nextLabel = "Next",
  tags = [],
  language,
}: ArticleWrapperProps) {
  return (
    <Container maxWidth="md">
      {/* Progress Bar */}
      <ScrollProgress />

      <Box sx={{ py: 2 }}>
        <BackToHome />

        {/* Article Meta */}
        {currentArticle && (
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* First row: Reading time, published date, and share button */}
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
                  <ReadingTime />
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

              {/* Second row: Language and Tags */}
              {(language || tags.length > 0) && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  {/* Language */}
                  {language && (
                    <Chip
                      label={language.toUpperCase()}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  )}

                  {/* Tags */}
                  {tags.length > 0 && (
                    <>
                      {tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                          color="secondary"
                        />
                      ))}
                    </>
                  )}
                </Box>
              )}
            </Box>
          </Box>
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
