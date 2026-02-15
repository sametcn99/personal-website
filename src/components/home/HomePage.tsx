"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useMemo } from "react";
import ContentSection from "@/components/home/ContentSection";
import LinksSection from "@/components/home/LinksSection";
import ReadmeSection from "@/components/home/ReadmeSection";
import SearchSection from "@/components/home/SearchSection";
import { useSearch } from "@/hooks/useSearch";
import { socialMediaLinks } from "@/lib/social";

interface HomePageProps {
  blogPosts: ContentMetadata[];
  projectPosts: ContentMetadata[];
  gistPosts: ContentMetadata[];
  blogTotal: number;
  projectTotal: number;
  gistTotal: number;
  allContents: ContentMetadata[];
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
    const linkPosts: ContentMetadata[] = socialMediaLinks.map((link) => ({
      title: link.label,
      href: `/link/${link.type[0]}`,
      publishedAt: "1970-01-01",
      summary: `${link.category} link • aliases: ${link.type.join(", ")}`,
      tags: [],
      language: "en",
    }));

    return [...blogPosts, ...projectPosts, ...gistPosts, ...linkPosts];
  }, [blogPosts, projectPosts, gistPosts]);

  return (
    <Box>
      <Container maxWidth="md">
        <Box>
          <SearchSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            clearSearch={clearSearch}
            allPosts={allPosts}
          />

          {!searchQuery && (
            <>
              <ReadmeSection />
              <ContentSection
                title="Blog Posts"
                description="A collection of my thoughts on development and the passions that keep me inspired."
                posts={blogPosts}
                total={blogTotal}
                viewAllHref="/blog"
              />
              <ContentSection
                title="Technical Gists"
                description="Code snippets, tutorials, and technical documentation."
                posts={gistPosts}
                total={gistTotal}
                viewAllHref="/gist"
              />
              <ContentSection
                title="Projects"
                description="A showcase of my personal projects and contributions to the developer community."
                posts={projectPosts}
                total={projectTotal}
                viewAllHref="/project"
              />
              <LinksSection />
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
}
