"use client";

import CodeIcon from "@mui/icons-material/Code";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BackToHome from "./BackToHome";
import FeedActions from "./FeedActions";

export default function RssPageContent() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box mb={4}>
        <BackToHome />
      </Box>

      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          Subscribe to Updates
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Stay up-to-date with the latest blog posts, gists, and projects.
          Choose your preferred feed format below.
        </Typography>
      </Box>

      <Stack spacing={4}>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
          gap={3}
        >
          <Paper
            elevation={0}
            variant="outlined"
            sx={(theme) => ({
              p: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                boxShadow: theme.shadows[4],
                borderColor: "primary.main",
              },
            })}
          >
            <Stack spacing={2} flexGrow={1}>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <RssFeedIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h5" fontWeight="bold">
                  RSS Feed
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" flexGrow={1}>
                Standard RSS 2.0 format. Compatible with Feedly, Inoreader, and
                most classic feed readers.
              </Typography>
              <Box pt={2}>
                <FeedActions url="/rss.xml" color="primary" />
              </Box>
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            variant="outlined"
            sx={(theme) => ({
              p: 4,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                boxShadow: theme.shadows[4],
                borderColor: "secondary.main",
              },
            })}
          >
            <Stack spacing={2} flexGrow={1}>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <CodeIcon color="secondary" sx={{ fontSize: 40 }} />
                <Typography variant="h5" fontWeight="bold">
                  JSON Feed
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" flexGrow={1}>
                Modern JSON format. Ideal for developers and programmatic
                consumption of the content.
              </Typography>
              <Box pt={2}>
                <FeedActions url="/feed.json" color="secondary" />
              </Box>
            </Stack>
          </Paper>
        </Box>

        <Paper
          elevation={0}
          sx={{ p: 4, bgcolor: "action.hover", borderRadius: 2 }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Quick Start Guide
          </Typography>
          <Stack spacing={2}>
            <Box display="flex" gap={2}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  bgcolor: "text.primary",
                  color: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                1
              </Box>
              <Typography variant="body2" color="text.secondary">
                Click <strong>"Open"</strong> to preview the feed in your
                browser, or <strong>"Copy Link"</strong> to copy the feed URL.
              </Typography>
            </Box>
            <Box display="flex" gap={2}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  bgcolor: "text.primary",
                  color: "background.paper",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: "bold",
                  flexShrink: 0,
                }}
              >
                2
              </Box>
              <Typography variant="body2" color="text.secondary">
                Paste the URL into your favorite feed reader (e.g., Feedly,
                Inoreader, NetNewsWire).
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
