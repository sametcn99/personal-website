/** biome-ignore-all lint/suspicious/noArrayIndexKey: . */
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import ContentSectionSkeleton from "./ContentSectionSkeleton";
import SearchSectionSkeleton from "./SearchSectionSkeleton";

export default function HomePageSkeleton() {
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
        <Box>
          {/* Search Section */}
          <SearchSectionSkeleton />

          {/* Content Sections */}
          <Box sx={{ animationDelay: "0.1s" }}>
            <ContentSectionSkeleton />
          </Box>
          <Box sx={{ animationDelay: "0.2s" }}>
            <ContentSectionSkeleton />
          </Box>
          <Box sx={{ animationDelay: "0.3s" }}>
            <ContentSectionSkeleton />
          </Box>

          {/* Links Section */}
          <Box
            sx={{
              mb: 6,
              opacity: 0,
              animation: "fadeIn 0.5s ease-out forwards",
              animationDelay: "0.4s",
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
            <Skeleton
              variant="text"
              width="150px"
              height={40}
              sx={{ mb: 2, borderRadius: 1 }}
              animation="wave"
            />
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={`link-skeleton-${index}`}
                  variant="rounded"
                  width={48}
                  height={48}
                  sx={{
                    borderRadius: 1,
                    opacity: 0,
                    animation: "scaleIn 0.3s ease-out forwards",
                    animationDelay: `${0.5 + index * 0.05}s`,
                    "@keyframes scaleIn": {
                      "0%": {
                        opacity: 0,
                        transform: "scale(0.8)",
                      },
                      "100%": {
                        opacity: 1,
                        transform: "scale(1)",
                      },
                    },
                  }}
                  animation="wave"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
