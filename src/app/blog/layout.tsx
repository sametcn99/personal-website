import BackToHome from "@/components/BackToHome";
import SaveThisPage from "@/components/SaveThisPage";
import Container from "@mui/material/Container";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="lg">
      <BackToHome />
      {children}
      <SaveThisPage />
    </Container>
  );
}
