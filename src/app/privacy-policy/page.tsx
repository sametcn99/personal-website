// components/PrivacyPolicy.tsx
import CodeIcon from "@mui/icons-material/Code";
import LockIcon from "@mui/icons-material/Lock";
import SecurityIcon from "@mui/icons-material/Security";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link as MuiLink,
  Typography,
} from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        fontWeight="bold"
        color="primary"
      >
        <LockIcon sx={{ fontSize: 40, verticalAlign: "middle", mr: 1 }} />{" "}
        Privacy Policy
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Last Updated: January 2026
      </Typography>

      <Divider sx={{ my: 4 }} />
      <section>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          fontWeight="medium"
        >
          1. My Commitment to Privacy and Open Source
        </Typography>
        <Typography paragraph>
          This Privacy Policy explains how I handle data. My primary goal is to
          enhance user experience and service reliability while maintaining
          absolute transparency and user anonymity.
        </Typography>
        <Box sx={{ p: 2, bgcolor: "action.hover", borderRadius: 1, my: 3 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{ display: "flex", alignItems: "center" }}
            gutterBottom
          >
            <CodeIcon color="primary" sx={{ mr: 1 }} /> Open Source & Trust
          </Typography>
          <Typography paragraph>
            <strong>This Website</strong> is an{" "}
            <strong>Open-Source Project</strong>. My entire codebase, including
            the server-side logic and all tracking mechanisms, is publicly
            available for audit and inspection on GitHub. This ensures complete
            transparency regarding what data I collect and how I process it.
          </Typography>
          <Typography>
            <strong>GitHub Repository:</strong>{" "}
            <MuiLink
              href="https://github.com/sametcn99/personal-website"
              target="_blank"
              rel="noopener noreferrer"
              fontWeight="bold"
              sx={{ ml: 1 }}
            >
              https://github.com/sametcn99/personal-website
            </MuiLink>
          </Typography>
        </Box>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* Section 2: Data Collection Methodology */}
      <section>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          fontWeight="medium"
        >
          2. The Data I Collect
        </Typography>
        <Typography paragraph>
          My data collection philosophy is built on transparency and privacy. I
          primarily use a <strong>Self-Hosted Umami Analytics</strong> instance,
          which gives me <strong>complete ownership and control</strong> over
          the data, ensuring it is never shared with third-party commercial
          providers. All data collected through this method is fully{" "}
          <strong>anonymized</strong>.
        </Typography>
        <Typography paragraph>
          In addition, I sometimes experiment with{" "}
          <strong>Microsoft Clarity</strong> and{" "}
          <strong>Cloudflare Analytics</strong>. These tools are used{" "}
          <strong>exclusively for learning purposes</strong>—to understand their
          integration and functionality—rather than for tracking individual
          users.
        </Typography>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* Section 4: Contact */}
      <section>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          fontWeight="medium"
        >
          4. Contact and Questions
        </Typography>
        <Typography paragraph>
          Due to the nature of my anonymous data collection, I generally cannot
          isolate and delete a specific individual&apos;s data set. However, I
          value transparency. If you have any questions or concerns about my
          privacy practices or wish to audit the open-source tracking code,
          please contact me:
        </Typography>
        <Typography paragraph fontWeight="bold">
          Support Email:{" "}
          <MuiLink href="mailto:sametcn99@gmail.com">
            sametcn99@gmail.com
          </MuiLink>
        </Typography>
      </section>
    </Container>
  );
}
