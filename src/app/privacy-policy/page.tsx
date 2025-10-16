// components/PrivacyPolicy.tsx
import React from 'react';
import {
    Container,
    Typography,
    Box,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Link as MuiLink
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function PrivacyPolicy() {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
                <LockIcon sx={{ fontSize: 40, verticalAlign: 'middle', mr: 1 }} /> Privacy Policy
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" paragraph>
                Last Updated: October 2025
            </Typography>

            <Divider sx={{ my: 4 }} />
            <section>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                    1. My Commitment to Privacy and Open Source
                </Typography>
                <Typography paragraph>
                    This Privacy Policy explains how I handle data. My primary goal is to enhance user experience and service reliability while maintaining absolute transparency and user anonymity.
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'action.hover', borderRadius: 1, my: 3 }}>
                    <Typography variant="h6" component="h3" sx={{ display: 'flex', alignItems: 'center' }} gutterBottom>
                        <CodeIcon color="primary" sx={{ mr: 1 }} /> Open Source & Trust
                    </Typography>
                    <Typography paragraph>
                        <strong>This Website</strong> is an <strong>Open-Source Project</strong>. My entire codebase, including the server-side logic and all tracking mechanisms, is publicly available for audit and inspection on GitHub. This ensures complete transparency regarding what data I collect and how I process it.
                    </Typography>
                    <Typography>
                        <strong>GitHub Repository:</strong>{' '}
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
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                    2. The Data I Collect (Self-Hosted Umami)
                </Typography>
                <Typography paragraph>
                    I use a <strong>Self-Hosted Umami Analytics</strong> instance for data collection. This means <strong>I own and control all the data</strong>, and it is never shared with any external commercial analytics provider (like Google, Meta, etc.). All collected data is <strong>anonymized</strong>.
                </Typography>

                <Typography variant="h6" component="h3" sx={{ mt: 3, mb: 1 }}>
                    Automatically Collected Contextual Data
                </Typography>
                <Typography paragraph>
                    Through a custom React Hook, the following technical data is collected with every event to understand your environment and context:
                </Typography>

                <List>
                    <ListItem>
                        <ListItemIcon><VisibilityIcon /></ListItemIcon>
                        <ListItemText
                            primary="Browser and Device Information"
                            secondary="User Agent (Browser, OS, Device Type), Browser Language. (Purpose: Troubleshooting compatibility and optimizing performance across different platforms.)"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><VisibilityIcon /></ListItemIcon>
                        <ListItemText
                            primary="Session and Page Context"
                            secondary="Current Page Path, Page Title, Referrer URL, and the Timestamp of the event. (Purpose: Analyzing user flow and identifying popular content.)"
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><SecurityIcon /></ListItemIcon>
                        <ListItemText
                            primary="IP Address (Anonymized)"
                            secondary="The IP address is used by my Umami instance solely to determine approximate geographical location (country, city) and is either anonymized (hashed) or discarded immediately before being stored in the database. It is never stored in its original form and cannot be traced back to an individual user."
                        />
                    </ListItem>
                </List>
            </section>

            <Divider sx={{ my: 4 }} />

            {/* Section 3: Data Usage and Sharing */}
            <section>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                    3. How I Use and Protect Your Data
                </Typography>
                <List dense>
                    <ListItem>
                        <ListItemText primary={<><strong>Data Storage:</strong> All anonymized data is stored exclusively on my private, controlled servers and remains within my infrastructure.</>} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={<><strong>Data Usage:</strong> I use the data strictly for internal purposes: measuring service stability, analyzing feature adoption, and improving the overall user experience (UX/UI).</>} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary={<><strong>No Third-Party Sharing:</strong> I do not sell, rent, or share any of your collected data with any third-party marketing, advertising, or data brokerage services.</>} />
                    </ListItem>
                </List>
            </section>

            <Divider sx={{ my: 4 }} />

            {/* Section 4: Contact */}
            <section>
                <Typography variant="h5" component="h2" gutterBottom fontWeight="medium">
                    4. Contact and Questions
                </Typography>
                <Typography paragraph>
                    Due to the nature of my anonymous data collection, I generally cannot isolate and delete a specific individual&apos;s data set. However, I value transparency. If you have any questions or concerns about my privacy practices or wish to audit the open-source tracking code, please contact me:
                </Typography>
                <Typography paragraph fontWeight="bold">
                    Support Email:{' '}
                    <MuiLink href="mailto:sametcn99@gmail.com">
                        sametcn99@gmail.com
                    </MuiLink>
                </Typography>
            </section>
        </Container>
    );
};
