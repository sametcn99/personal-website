"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useMemo } from "react";
import Footer from "@/components/Footer";
import ContentSection from "@/components/home/ContentSection";
import LinksSection from "@/components/home/LinksSection";
import SearchSection from "@/components/home/SearchSection";
import { useSearch } from "@/hooks/useSearch";

interface HomePageProps {
  blogPosts: ContentMetadata[];
  projectPosts: ContentMetadata[];
  gistPosts: ContentMetadata[];
  blogTotal: number;
  projectTotal: number;
  gistTotal: number;
}

export default function HomePage({
  blogPosts,
  projectPosts,
  gistPosts,
  blogTotal,
  projectTotal,
  gistTotal,
}: HomePageProps) {
  const { searchQuery, setSearchQuery, clearSearch } = useSearch("homepage");

  // Combine all posts for global search
  const allPosts = useMemo(() => {
    return [...blogPosts, ...projectPosts, ...gistPosts];
  }, [blogPosts, projectPosts, gistPosts]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box>
          <SearchSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            clearSearch={clearSearch}
            allPosts={allPosts}
          />

          {!searchQuery && (
            <>
              <ContentSection
                title="Blog Posts"
                description="A collection of my thoughts on development and the passions that keep me inspired."
                posts={blogPosts}
                total={blogTotal}
                viewAllHref="/blog"
              />
              <ContentSection
                title="Projects"
                description="A showcase of my personal projects and contributions to the developer community."
                posts={projectPosts}
                total={projectTotal}
                viewAllHref="/project"
              />
              <ContentSection
                title="Technical Gists"
                description="Code snippets, tutorials, and technical documentation."
                posts={gistPosts}
                total={gistTotal}
                viewAllHref="/gist"
              />
              <LinksSection />
            </>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
