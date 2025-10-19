import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import PostsListSkeleton from "./PostsListSkeleton";

export default function ContentSectionSkeleton() {
  return (
    <Box
      sx={{
        mb: 6,
        opacity: 0,
        animation: "fadeIn 0.5s ease-out forwards",
        "@keyframes fadeIn": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      }}
    >
      {/* Header with title and button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Skeleton
          variant="text"
          width="200px"
          height={40}
          sx={{ borderRadius: 1 }}
          animation="wave"
        />
        <Skeleton
          variant="rounded"
          width="120px"
          height={32}
          sx={{ borderRadius: 1 }}
          animation="wave"
        />
      </Box>

      {/* Description */}
      <Skeleton
        variant="text"
        width="70%"
        height={20}
        sx={{ mb: 3, borderRadius: 1 }}
        animation="wave"
      />

      {/* Posts list */}
      <PostsListSkeleton count={5} />
    </Box>
  );
}
