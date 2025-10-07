import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Link, Typography } from "@mui/material";
import NextLink from "next/link";

interface ArticleData {
  href: string;
  title: string;
}

interface ArticleNavigationProps {
  contentType: ContentType
  prevArticle?: ArticleData | null;
  nextArticle?: ArticleData | null;
  prevLabel?: string;
  nextLabel?: string;
}

export default function ArticleNavigation({
  contentType,
  prevArticle,
  nextArticle,
  prevLabel = "Previous",
  nextLabel = "Next",
}: ArticleNavigationProps) {
  if (!prevArticle && !nextArticle) return null;

  return (
    <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
      {/* Previous Article */}
      {prevArticle && (
        <Box
          sx={{
            flex: 1,
            minWidth: 200,
            p: 2,
            backgroundColor: "transparent",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <Link
            component={NextLink}
            href={prevArticle.href}
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <NavigateBeforeIcon color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {prevLabel}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {prevArticle.title}
                </Typography>
              </Box>
            </Box>
          </Link>
        </Box>
      )}

      {/* Next Article */}
      {nextArticle && (
        <Box
          sx={{
            flex: 1,
            minWidth: 200,
            p: 2,
            backgroundColor: "transparent",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <Link
            component={NextLink}
            href={nextArticle.href}
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="body2" color="text.secondary">
                  {nextLabel}
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {nextArticle.title}
                </Typography>
              </Box>
              <NavigateNextIcon color="primary" />
            </Box>
          </Link>
        </Box>
      )}
    </Box>
  );
}
