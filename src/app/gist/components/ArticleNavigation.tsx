import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, Link, Paper, Typography } from "@mui/material";

interface GistData {
  href: string;
  title: string;
}

interface ArticleNavigationProps {
  prevGist?: GistData | null;
  nextGist?: GistData | null;
}

export default function ArticleNavigation({
  prevGist,
  nextGist,
}: ArticleNavigationProps) {
  if (!prevGist && !nextGist) return null;

  return (
    <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
      {/* Previous Gist */}
      {prevGist && (
        <Paper
          elevation={1}
          sx={{
            flex: 1,
            minWidth: 200,
            p: 2,
            "&:hover": { backgroundColor: "action.hover" },
          }}
        >
          <Link
            href={prevGist.href}
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <NavigateBeforeIcon color="primary" />
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Previous
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {prevGist.title}
                </Typography>
              </Box>
            </Box>
          </Link>
        </Paper>
      )}

      {/* Next Gist */}
      {nextGist && (
        <Paper
          elevation={1}
          sx={{
            flex: 1,
            minWidth: 200,
            p: 2,
            "&:hover": { backgroundColor: "action.hover" },
          }}
        >
          <Link
            href={nextGist.href}
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
                  Next
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {nextGist.title}
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
