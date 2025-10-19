import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

interface SearchSectionSkeletonProps {
  showSortControls?: boolean;
}

export default function SearchSectionSkeleton({
  showSortControls = false,
}: SearchSectionSkeletonProps) {
  return (
    <Box
      sx={{
        mb: 4,
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
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        {/* Search input */}
        <Skeleton
          variant="rounded"
          height={40}
          sx={{
            flex: 1,
            borderRadius: 1,
          }}
          animation="wave"
        />

        {/* Sort controls */}
        {showSortControls && (
          <Box sx={{ display: "flex", gap: 1, minWidth: { sm: "300px" } }}>
            <Skeleton
              variant="rounded"
              width={120}
              height={40}
              sx={{ borderRadius: 1 }}
              animation="wave"
            />
            <Skeleton
              variant="rounded"
              width={120}
              height={40}
              sx={{ borderRadius: 1 }}
              animation="wave"
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
