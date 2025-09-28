"use client";

import Footer from "@/components/Footer";
import { useLinks } from "@/hooks/useLinks";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface PageClientProps {
  gistPosts: ContentMetadata[];
  blogPosts: ContentMetadata[];
}

function LinksSection() {
  const { visibleLinks, hiddenLinks } = useLinks();
  const allLinks = [...visibleLinks, ...hiddenLinks];

  if (!allLinks.length) {
    return null;
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Connect With Me
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "gray" }}>
        I&apos;m too lazy to bookmark things properly, so here&apos;s literally
        every platform I&apos;ve ever signed up for.
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {allLinks.map((link) => {
          const isExternal =
            link.external || /^https?:\/\//.test(link.link.toString());
          const commonSx = {
            color: "text.secondary",
            textDecoration: "none",
            transition: "color 0.2s ease",
            "&:hover": {
              color: "text.primary",
              textDecoration: "underline",
            },
          } as const;

          if (isExternal) {
            return (
              <Typography
                key={link.label}
                variant="body2"
                component="a"
                href={link.link.toString()}
                target="_blank"
                rel="noopener noreferrer"
                sx={commonSx}
              >
                {link.label}
              </Typography>
            );
          }

          return (
            <Typography
              key={link.label}
              variant="body2"
              component={Link}
              href={link.link.toString()}
              sx={commonSx}
            >
              {link.label}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
}

// Blog Posts Section Component
function BlogPostsSection({ blogPosts }: { blogPosts: ContentMetadata[] }) {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Blog Posts
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "gray" }}>
        A collection of my thoughts on development and the passions that keep me
        inspired.
      </Typography>
      <PostsList posts={blogPosts.slice(0, 5)} />
    </Box>
  );
}

// Technical Gists Section Component
function TechnicalGistsSection({
  gistPosts,
}: {
  gistPosts: ContentMetadata[];
}) {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Technical Gists
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: "gray" }}>
        Code snippets, tutorials, and technical documentation.
      </Typography>
      <PostsList posts={gistPosts.slice(0, 5)} />
    </Box>
  );
}

// Posts List Component (for both gists and blog posts)
function PostsList({ posts }: { posts: ContentMetadata[] }) {
  return (
    <Box>
      {posts.map((post) => (
        <Box
          key={post.href}
          component={Link}
          href={post.href}
          sx={{
            display: "block",
            mb: 3,
            textDecoration: "none",
            color: "inherit",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {post.title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, color: "gray" }}>
            {post.summary}
          </Typography>
          <Typography variant="caption" sx={{ color: "gray" }}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default function PageClient({ gistPosts, blogPosts }: PageClientProps) {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box>
          <BlogPostsSection blogPosts={blogPosts} />
          <TechnicalGistsSection gistPosts={gistPosts} />
          <LinksSection />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
