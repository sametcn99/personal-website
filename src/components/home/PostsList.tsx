import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface PostsListProps {
  posts: ContentMetadata[];
}

/**
 * Converts a post title into an Umami-safe event name segment.
 */
function toEventSegment(title: string): string {
  const normalized = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return normalized || "post";
}

/**
 * Formats optional ISO date values for UI output.
 */
function formatOptionalDate(value?: string): string {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "-" : date.toDateString();
}

export default function PostsList({ posts }: PostsListProps) {
  return (
    <Box>
      {posts.map((post) => {
        const isRepoCard = post.href.startsWith("/repo/");

        return (
          <Box
            key={post.href}
            component={Link}
            href={post.href}
            data-umami-event={`${toEventSegment(post.title)}-click`}
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
            {isRepoCard ? (
              <Typography variant="caption" sx={{ color: "gray" }}>
                Created:{" "}
                {formatOptionalDate(post.createdAt || post.publishedAt)}
                {" • "}
                Updated:{" "}
                {formatOptionalDate(post.updatedAt || post.publishedAt)}
                {" • "}
                Repository
              </Typography>
            ) : (
              <Typography variant="caption" sx={{ color: "gray" }}>
                {new Date(post.publishedAt).toDateString()}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
}
