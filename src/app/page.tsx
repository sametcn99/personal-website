"use client";

import LinksSection from "@/components/LinksSection";
import ContentTabs from "@/components/tabs/ContentTabs";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      minHeight="100vh"
      py={4}
    >
      <Container maxWidth="sm">
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Social Media Links Section */}
          <LinksSection />

          {/* Content Tabs Section */}
          <ContentTabs />
        </Box>

        {/* Footer */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2" color="text.secondary">
            Last updated: {new Date().toLocaleDateString("tr-TR")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
