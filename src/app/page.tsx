"use client";

import appData from "@/lib/app-data.json";
import { categoryOrder, socialMediaLinks } from "@/lib/social";
import Code from "@mui/icons-material/Code";
import Description from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export default function Home() {
  const visibleLinks = socialMediaLinks
    .filter((link) => link.visible)
    .sort((a, b) => {
      // First, sort by category order
      const categoryOrderA = categoryOrder[a.category] || Number.MAX_VALUE;
      const categoryOrderB = categoryOrder[b.category] || Number.MAX_VALUE;

      if (categoryOrderA !== categoryOrderB) {
        return categoryOrderA - categoryOrderB;
      }

      // If categories have the same order, sort by label
      return a.label.localeCompare(b.label);
    });

  // Function to render an icon based on the title
  const getIconForItem = (title: string) => {
    if (title === "Home") return <HomeIcon />;
    if (title === "CV") return <Description />;
    return <Code />; // Default icon for gists
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Ensure the box takes full viewport height
    >
      <Container maxWidth="sm">
        {/* Social Media Links */}
        <Typography variant="h6" gutterBottom>
          Links
        </Typography>
        <List>
          {visibleLinks.map((link, index) => (
            <Fade in={true} timeout={500 + index * 150} key={link.label}>
              <ListItem disablePadding>
                <ListItemButton
                  component="a"
                  href={link.link.toString()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ListItemIcon>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            </Fade>
          ))}
        </List>

        {/* Divider between sections */}
        <Divider sx={{ my: 2 }} />

        {/* Gists */}
        <Typography variant="h6" gutterBottom>
          Gists
        </Typography>
        <List>
          {appData.map((item, index) => (
            <Fade in={true} timeout={500 + index * 150} key={item.title}>
              <ListItem disablePadding>
                <ListItemButton component="a" href={item.href}>
                  <ListItemIcon>{getIconForItem(item.title)}</ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    secondary={new Date(item.lastModified).toUTCString()}
                  />
                </ListItemButton>
              </ListItem>
            </Fade>
          ))}
        </List>
      </Container>
    </Box>
  );
}
