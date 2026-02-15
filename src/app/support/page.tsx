import CoffeeIcon from "@mui/icons-material/Coffee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Metadata } from "next";
import BackToHome from "@/components/BackToHome";

export const metadata: Metadata = {
  title: "Support Me",
  description:
    "If you find my content helpful, you can support me to help me create more.",
};

export default function SupportPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <BackToHome />
      <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
        Support My Work
      </Typography>

      <Typography
        variant="body1"
        paragraph
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Creating open-source projects, writing technical articles, and sharing
        knowledge takes a lot of time and effort. If you find my content helpful
        or have used my projects in your work, consider supporting me. Your
        support helps me keep doing what I love and sharing it with the
        community.
      </Typography>

      <Stack spacing={3}>
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderColor: "divider",
            borderRadius: 2,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={3}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                bgcolor: "#FFDD00",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "black",
              }}
            >
              <CoffeeIcon fontSize="large" />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Buy Me a Coffee
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                A simple way to say thanks. You can buy me a coffee to fuel my
                next coding session.
              </Typography>
              <Button
                variant="contained"
                href="https://buymeacoffee.com/sametcn99"
                data-umami-event="support-buymeacoffee-click"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  bgcolor: "#FFDD00",
                  color: "black",
                  fontWeight: 600,
                  "&:hover": {
                    bgcolor: "#FFEA00",
                  },
                }}
              >
                Support on Buy Me a Coffee
              </Button>
            </Box>
          </Stack>
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderColor: "divider",
            borderRadius: 2,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems="center"
            spacing={3}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                bgcolor: "pink",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FavoriteIcon fontSize="large" color="error" />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                GitHub Sponsors
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Support my open-source work directly on GitHub. Monthly and
                one-time sponsorships are available.
              </Typography>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<FavoriteIcon color="error" />}
                href="https://github.com/sponsors/sametcn99"
                data-umami-event="support-github-sponsor-click"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  borderColor: "divider",
                  "&:hover": {
                    borderColor: "text.primary",
                    bgcolor: "action.hover",
                  },
                }}
              >
                Sponsor on GitHub
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
