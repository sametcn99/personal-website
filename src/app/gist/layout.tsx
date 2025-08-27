"use client";
import BackToHome from "@/components/BackToHome";
import SaveThisPage from "@/components/SaveThisPage";
import appData from "@/lib/app-data.json";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ShareIcon from "@mui/icons-material/Share";
import TimerIcon from "@mui/icons-material/Timer";
import {
  Box,
  Chip,
  Container,
  LinearProgress,
  Link,
  Paper,
  Typography,
  alpha,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function GistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const pathname = usePathname();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  // Get current gist info
  const currentSlug = pathname.split("/").pop();
  const currentGistIndex = appData.findIndex((item) =>
    item.href.includes(currentSlug || ""),
  );
  const currentGist = appData[currentGistIndex];
  const prevGist = currentGistIndex > 0 ? appData[currentGistIndex - 1] : null;
  const nextGist =
    currentGistIndex < appData.length - 1
      ? appData[currentGistIndex + 1]
      : null;

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate reading time
  useEffect(() => {
    const timer = setTimeout(() => {
      // Calculate reading time (average 200 words per minute)
      const mainContent = document.querySelector("main");
      if (!mainContent) return;

      const text = mainContent.textContent || "";
      const wordCount = text
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
      const time = Math.max(1, Math.ceil(wordCount / 200));
      setReadingTime(time);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, children]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: currentGist?.title || "Technical Gist",
        url: window.location.href,
      });
    } catch {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Progress Bar */}
      <LinearProgress
        variant="determinate"
        value={scrollProgress}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.appBar,
          height: 3,
          backgroundColor: "transparent",
          "& .MuiLinearProgress-bar": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      />

      <Box sx={{ py: 2 }}>
        <BackToHome />

        {/* Article Meta */}
        {currentGist && (
          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
              backgroundColor: alpha(theme.palette.primary.main, 0.02),
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
                <Chip
                  icon={<TimerIcon />}
                  label={`${readingTime} min read`}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
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
              <Chip
                icon={<ShareIcon />}
                label="Share"
                onClick={handleShare}
                clickable
                color="secondary"
                variant="outlined"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                  },
                }}
              />
            </Box>
          </Paper>
        )}

        {/* Main Content */}
        <Box component="main" sx={{ mb: 4 }}>
          {children}
        </Box>

        {/* Navigation between articles */}
        {(prevGist || nextGist) && (
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
        )}

        <SaveThisPage />
      </Box>
    </Container>
  );
}
