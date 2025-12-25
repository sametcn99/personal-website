"use client";

import { Box, Container, Divider, Typography } from "@mui/material";
import ArticleNavigation from "@/components/ArticleNavigation";
import BackToHome from "@/components/BackToHome";
import ImFeelingLucky from "@/components/ImFeelingLucky";
import ReadingTime from "@/components/ReadingTime";
import ScrollProgress from "@/components/ScrollProgress";
import ShareButton from "@/components/ShareButton";
import { HorizontalRule } from "./mdx-components";

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
  contentType: ContentType;
  publishedLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  tags?: string[];
  language?: string;
  allContents?: ContentMetadata[];
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
  allContents = [],
}: ArticleWrapperProps) {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 2 }}>
        <BackToHome />

        {/* Article Meta */}
        {currentArticle && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* First row: Reading time, published date, and share button */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {publishedLabel}:{" "}
                {new Date(currentArticle.lastModified).toDateString()}
              </Typography>
              <ReadingTime />
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
                  <Typography
                    component="span"
                    variant="caption"
                    color="text.secondary"
                  >
                    {language.toUpperCase()}
                  </Typography>
                )}

                {/* Tags */}
                {tags.length > 0 &&
                  tags.map((tag) => (
                    <Typography
                      key={tag}
                      color="textSecondary"
                      variant="caption"
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          textDecoration: "underline",
                        },
                      }}
                    >
                      #{tag}
                    </Typography>
                  ))}
              </Box>
            )}
          </Box>
        )}

        <HorizontalRule />

        {/* Main Content */}
        <Box component="article">{children}</Box>

        {/* Navigation between articles */}
        <ArticleNavigation
          contentType={contentType}
          prevArticle={prevArticle}
          nextArticle={nextArticle}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
        />

        {/* I'm Feeling Lucky button */}
        {allContents.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <ImFeelingLucky contents={allContents} />
          </Box>
        )}
      </Box>
    </Container>
  );
}
