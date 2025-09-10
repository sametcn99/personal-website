"use client";

import Footer from "@/components/Footer";
import LinksSection from "@/components/LinksSection";
import ContentTabs from "@/components/tabs/ContentTabs";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

type GistPost = {
  title: string;
  href: string;
  lastModified: string;
};

type BlogPost = {
  title: string;
  href: string;
  lastModified: string;
  tags: string[];
  language: string;
};

interface PageClientProps {
  gistPosts: GistPost[];
  blogPosts: BlogPost[];
}

export default function PageClient({ gistPosts, blogPosts }: PageClientProps) {
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
          <ContentTabs gistPosts={gistPosts} blogPosts={blogPosts} />
        </Box>

        {/* Footer */}
        <Footer />
      </Container>
    </Box>
  );
}
