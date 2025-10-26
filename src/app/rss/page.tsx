import CodeIcon from "@mui/icons-material/Code";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RSS Feed",
  description:
    "Subscribe to blog posts, gists, and projects via RSS or JSON Feed",
};

export default function RssPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Subscribe to Updates
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Stay up-to-date with the latest blog posts, gists, and projects.
              Choose your preferred feed format below.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              Available Feeds
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <RssFeedIcon color="primary" fontSize="large" />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">RSS Feed</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Standard RSS 2.0 format, compatible with most feed readers
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    href="/rss.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Subscribe
                  </Button>
                </Stack>
              </Paper>

              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <CodeIcon color="secondary" fontSize="large" />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">JSON Feed</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Modern JSON format, easy to parse programmatically
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    href="/feed.json"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Subscribe
                  </Button>
                </Stack>
              </Paper>
            </Stack>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              How to Use
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              <ol style={{ paddingLeft: "1.5rem" }}>
                <li>
                  Click the "Subscribe" button for your preferred feed format
                </li>
                <li>Copy the URL or open it in your feed reader application</li>
                <li>
                  Popular feed readers: Feedly, Inoreader, NewsBlur, NetNewsWire
                </li>
              </ol>
            </Typography>
          </Box>

          <Box sx={{ mt: 2, p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
            <Typography variant="body2" fontFamily="monospace">
              <strong>RSS:</strong>{" "}
              {typeof window !== "undefined"
                ? window.location.origin
                : "https://sametcc.me"}
              /rss.xml
            </Typography>
            <Typography variant="body2" fontFamily="monospace" sx={{ mt: 1 }}>
              <strong>JSON Feed:</strong>{" "}
              {typeof window !== "undefined"
                ? window.location.origin
                : "https://sametcc.me"}
              /feed.json
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
