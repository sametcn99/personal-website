import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

interface PostsListSkeletonProps {
  count?: number;
}

export default function PostsListSkeleton({
  count = 5,
}: PostsListSkeletonProps) {
  return (
    <Box>
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={`post-skeleton-${
            // biome-ignore lint/suspicious/noArrayIndexKey: .
            index
          }`}
          sx={{
            mb: 3,
            opacity: 0,
            animation: "fadeInUp 0.5s ease-out forwards",
            animationDelay: `${index * 0.1}s`,
            "@keyframes fadeInUp": {
              "0%": {
                opacity: 0,
                transform: "translateY(20px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          {/* Title */}
          <Skeleton
            variant="text"
            width="80%"
            height={32}
            sx={{ mb: 1, borderRadius: 1 }}
            animation="wave"
          />

          {/* Summary - 2 lines */}
          <Skeleton
            variant="text"
            width="100%"
            height={20}
            sx={{ mb: 0.5, borderRadius: 1 }}
            animation="wave"
          />
          <Skeleton
            variant="text"
            width="90%"
            height={20}
            sx={{ mb: 1, borderRadius: 1 }}
            animation="wave"
          />

          {/* Date */}
          <Skeleton
            variant="text"
            width="120px"
            height={16}
            sx={{ borderRadius: 1 }}
            animation="wave"
          />
        </Box>
      ))}
    </Box>
  );
}
