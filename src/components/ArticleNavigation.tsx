import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Link, Paper, Typography } from "@mui/material";

interface ArticleData {
  href: string;
  title: string;
}

interface ArticleNavigationProps {
  prevArticle?: ArticleData | null;
  nextArticle?: ArticleData | null;
  prevLabel?: string;
  nextLabel?: string;
}

export default function ArticleNavigation({
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
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            minWidth: 200,
            p: 2,
            backgroundColor: "transparent",
            border: "1px solid",
            borderColor: "divider",
            "&:hover": { backgroundColor: "action.hover" },
          }}
        >
          <Link
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
        </Paper>
      )}

      {/* Next Article */}
      {nextArticle && (
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            minWidth: 200,
            p: 2,
            backgroundColor: "transparent",
            border: "1px solid",
            borderColor: "divider",
            "&:hover": { backgroundColor: "action.hover" },
          }}
        >
          <Link
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
        </Paper>
      )}
    </Box>
  );
}
