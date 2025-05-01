import Container from "@mui/material/Container"; // MUI Container'ı içe aktar

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        "@media print": {
          mx: 0,
          px: 0,
          bgcolor: "white",
          color: "black",
        },
      }}
    >
      {children}
    </Container>
  );
}
