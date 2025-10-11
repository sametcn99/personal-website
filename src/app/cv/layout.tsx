import BackToHome from "@/components/BackToHome";
import SaveThisPage from "@/components/SaveThisPage";
import Container from "@mui/material/Container"; // MUI Container'ı içe aktar

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="md">
      <BackToHome />
      {children}
      <SaveThisPage />
    </Container>
  );
}
