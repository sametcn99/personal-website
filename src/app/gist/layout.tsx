import Container from "@mui/material/Container"; // MUI Container'ı içe aktar

export default function BlogLayout({ children }: { children: React.ReactNode }) {
	return <Container maxWidth="lg">{children}</Container>;
}
