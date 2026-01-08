"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CoffeeIcon from "@mui/icons-material/Coffee";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

export default function SponsorSection() {
  return (
    <Box sx={{ mb: 6 }}>
      <Paper
        variant="outlined"
        sx={{
          p: 3,
          bgcolor: "background.paper",
          borderColor: "divider",
          borderRadius: 2,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="body1" color="text.secondary">
            Creating open-source projects and sharing knowledge takes time and
            coffee. If my work has helped you, consider supporting me.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              startIcon={<CoffeeIcon />}
              href="https://buymeacoffee.com/sametcn99"
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
              Buy Me a Coffee
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<FavoriteIcon color="error" />}
              href="https://github.com/sponsors/sametcn99"
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
              GitHub Sponsors
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
