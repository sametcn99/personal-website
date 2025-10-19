import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import PostsListSkeleton from "./PostsListSkeleton";
import SearchSectionSkeleton from "./SearchSectionSkeleton";

export default function ContentListPageSkeleton() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        opacity: 0,
        animation: "fadeIn 0.3s ease-out forwards",
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
      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Back to Home button */}
        <Skeleton
          variant="rounded"
          width={120}
          height={36}
          sx={{
            mb: 4,
            borderRadius: 1,
            opacity: 0,
            animation: "slideInLeft 0.4s ease-out forwards",
            "@keyframes slideInLeft": {
              "0%": {
                opacity: 0,
                transform: "translateX(-20px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateX(0)",
              },
            },
          }}
          animation="wave"
        />

        <Box sx={{ mt: 4 }}>
          {/* Title */}
          <Skeleton
            variant="text"
            width="60%"
            height={48}
            sx={{
              mb: 2,
              borderRadius: 1,
              opacity: 0,
              animation: "fadeIn 0.5s ease-out forwards",
              animationDelay: "0.1s",
              "@keyframes fadeIn": {
                "0%": {
                  opacity: 0,
                },
                "100%": {
                  opacity: 1,
                },
              },
            }}
            animation="wave"
          />

          {/* Description */}
          <Skeleton
            variant="text"
            width="80%"
            height={24}
            sx={{
              mb: 4,
              borderRadius: 1,
              opacity: 0,
              animation: "fadeIn 0.5s ease-out forwards",
              animationDelay: "0.2s",
              "@keyframes fadeIn": {
                "0%": {
                  opacity: 0,
                },
                "100%": {
                  opacity: 1,
                },
              },
            }}
            animation="wave"
          />

          {/* Search and Sort Section */}
          <Box sx={{ animationDelay: "0.3s" }}>
            <SearchSectionSkeleton showSortControls={true} />
          </Box>

          {/* Posts List */}
          <Box sx={{ animationDelay: "0.4s" }}>
            <PostsListSkeleton count={10} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
