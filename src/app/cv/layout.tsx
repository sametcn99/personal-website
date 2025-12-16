import Box from "@mui/material/Box";
import Container from "@mui/material/Container"; // MUI Container'ı içe aktar
import BackToHome from "@/components/BackToHome";
import DownloadCv from "@/components/DownloadCv";
import SaveThisPage from "@/components/SaveThisPage";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="md">
      <BackToHome />
      {children}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 4,
          mb: 4,
          "@media print": {
            display: "none",
          },
        }}
      >
        <DownloadCv />
        <SaveThisPage />
      </Box>
    </Container>
  );
}
