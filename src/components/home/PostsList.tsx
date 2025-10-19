import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface PostsListProps {
  posts: ContentMetadata[];
}

export default function PostsList({ posts }: PostsListProps) {
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
