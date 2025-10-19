import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import PostsList from "./PostsList";

interface ContentSectionProps {
  title: string;
  description: string;
  posts: ContentMetadata[];
  total: number;
  viewAllHref: string;
}

export default function ContentSection({
  title,
  description,
  posts,
  total,
  viewAllHref,
}: ContentSectionProps) {
  const hasMore = total > posts.length;

  return (
    <Box sx={{ mb: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" component="h2" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        {hasMore && (
          <Button
            component={Link}
            href={viewAllHref}
            variant="outlined"
            size="small"
            sx={{ textTransform: "none" }}
          >
            See All ({total})
          </Button>
        )}
      </Box>
      <Typography variant="body2" sx={{ mb: 3, color: "gray" }}>
        {description}
      </Typography>
      <PostsList posts={posts} />
    </Box>
  );
}
