"use client";

import Footer from "@/components/Footer";
import LinksSection from "@/components/LinksSection";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface PageClientProps {
  gistPosts: ContentMetadata[];
  blogPosts: ContentMetadata[];
}

// Info Grid Component for About Section
function InfoGrid() {
  const infoItems = [
    {
      icon: <WorkIcon color="primary" />,
      title: "Experience",
      description: "3+ Years in Web Development",
    },
    {
      icon: <SchoolIcon color="primary" />,
      title: "Education",
      description: "Computer Programming",
    },
    {
      icon: <LocationOnIcon color="primary" />,
      title: "Location",
      description: "Ankara, Turkey",
    },
    {
      icon: <EmailIcon color="primary" />,
      title: "Contact",
      description: "Available for opportunities",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        gap: 3,
      }}
    >
      {infoItems.map((item) => (
        <Box
          key={item.title}
          sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
        >
          {item.icon}
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </Box>
        </Box>
      ))}
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
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mb: 4,
        backgroundColor: "transparent",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Technical Gists
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Code snippets, tutorials, and technical documentation
      </Typography>
      <PostsList posts={gistPosts.slice(0, 5)} hoverColor="primary.main" />
    </Paper>
  );
}

// Blog Posts Section Component
function BlogPostsSection({ blogPosts }: { blogPosts: ContentMetadata[] }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        backgroundColor: "transparent",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Blog Posts
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Thoughts, experiences, and insights on technology and development
      </Typography>
      <PostsList
        posts={blogPosts.slice(0, 5)}
        hoverColor="secondary.main"
        showTags
      />
    </Paper>
  );
}

// Posts List Component (for both gists and blog posts)
function PostsList({
  posts,
  hoverColor,
  showTags = false,
}: {
  posts: ContentMetadata[];
  hoverColor: string;
  showTags?: boolean;
}) {
  return (
    <Box sx={{ maxHeight: 400, overflow: "auto" }}>
      {posts.map((post) => (
        <Box
          key={post.href}
          component="a"
          href={post.href}
          sx={{
            display: "block",
            p: 2,
            mb: 2,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            textDecoration: "none",
            color: "inherit",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: hoverColor,
            },
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {post.summary}
          </Typography>
          {showTags ? (
            <PostMeta post={post} />
          ) : (
            <Typography variant="caption" color="text.secondary">
              {new Date(post.publishedAt).toLocaleDateString()}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );
}

// Post Meta Component (for date and tags)
function PostMeta({ post }: { post: ContentMetadata }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {new Date(post.publishedAt).toLocaleDateString()}
      </Typography>
      {post.tags && post.tags.length > 0 && (
        <Box sx={{ display: "flex", gap: 0.5 }}>
          {post.tags.slice(0, 2).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              color="secondary"
              sx={{ fontSize: "0.7rem", height: 20 }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}

// Skills Section Component
function SkillsSection() {
  const technicalSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Nest.js",
    "Python",
    "Git",
    "Docker",
    "AWS",
  ];

  const interests = [
    "Open Source",
    "AI/ML",
    "Web Development",
    "Object-Oriented Programming",
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mt: 3,
        backgroundColor: "transparent",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Technical Skills
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        {technicalSkills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            size="small"
            variant="filled"
            color="primary"
            sx={{ opacity: 0.8 }}
          />
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Interests
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {interests.map((interest) => (
          <Chip
            key={interest}
            label={interest}
            size="small"
            variant="outlined"
            color="secondary"
          />
        ))}
      </Box>
    </Paper>
  );
}

// Main Content Component
function MainContent({
  gistPosts,
  blogPosts,
}: {
  gistPosts: ContentMetadata[];
  blogPosts: ContentMetadata[];
}) {
  return (
    <Box sx={{ flex: { xs: "1", md: "2" } }}>
      <TechnicalGistsSection gistPosts={gistPosts} />
      <BlogPostsSection blogPosts={blogPosts} />
    </Box>
  );
}

// Sidebar Component
function Sidebar() {
  return (
    <Box sx={{ flex: { xs: "1", md: "1" } }}>
      <LinksSection />
      <SkillsSection />
    </Box>
  );
}

export default function PageClient({ gistPosts, blogPosts }: PageClientProps) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <MainContent gistPosts={gistPosts} blogPosts={blogPosts} />
          <Sidebar />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
