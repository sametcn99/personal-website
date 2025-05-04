import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
      sx={{ p: 2 }}
    >
      <Container maxWidth="sm">
        <ReportProblemOutlinedIcon
          sx={{ fontSize: 60, color: "text.secondary" }}
        />
        <Typography variant="h1" component="h1">
          404
        </Typography>
        <Typography variant="h5" component="h2">
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          component="p"
          gutterBottom
        >
          The page you are looking for does not exist or may have been moved.
        </Typography>
        <Button variant="outlined" component={Link} href="/" draggable="false">
          Return to Home Page
        </Button>
      </Container>
    </Box>
  );
}
