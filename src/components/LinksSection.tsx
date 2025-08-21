import { useLinks } from "@/hooks/useLinks";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function LinksSection() {
  const { showAllLinks, setShowAllLinks, linksByCategory, hiddenLinks } =
    useLinks();

  return (
    <Box flex={{ xs: 1, md: "1 1 50%" }}>
      <Paper
        elevation={2}
        sx={{ p: 3, height: "fit-content" }}
        variant="outlined"
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: "medium",
          }}
        >
          <OpenInNewIcon color="primary" />
          Links
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Connect with me on various platforms
        </Typography>

        {Object.entries(linksByCategory).map(([category, links]) => (
          <Box key={category} sx={{ mb: 3 }}>
            <Chip
              label={category}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <List dense>
              {links.map((link) => (
                <ListItem disablePadding key={link.label}>
                  <ListItemButton
                    component="a"
                    href={link.link.toString()}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {link.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={link.label}
                      slotProps={{
                        primary: {
                          fontSize: "0.9rem",
                        },
                      }}
                    />
                    {link.external && (
                      <OpenInNewIcon
                        sx={{ ml: 1 }}
                        fontSize="small"
                        color="action"
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}

        {/* See all links toggle */}
        <Box sx={{ mt: 2, textAlign: "left" }}>
          <Typography
            variant="caption"
            component="button"
            onClick={() => setShowAllLinks(!showAllLinks)}
            sx={{
              color: "text.secondary",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              transition: "all 0.3s ease-in-out",
              transform: showAllLinks ? "rotate(0deg)" : "rotate(0deg)",
              "&:hover": {
                color: "text.primary",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                transition: "transform 0.2s ease-in-out",
                transform: showAllLinks ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              {showAllLinks ? (
                <ExpandLessIcon fontSize="small" />
              ) : (
                <ExpandMoreIcon fontSize="small" />
              )}
            </Box>
            {showAllLinks ? "hide" : "see all"}
          </Typography>
        </Box>

        {/* Hidden links when showing all */}
        <Collapse
          in={showAllLinks}
          timeout={500}
          easing={{
            enter: "cubic-bezier(0.4, 0, 0.2, 1)",
            exit: "cubic-bezier(0.4, 0, 0.6, 1)",
          }}
        >
          <Box
            sx={{
              mt: 2,
              pt: 2,
              borderTop: "1px solid",
              borderColor: "divider",
              opacity: showAllLinks ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {hiddenLinks.map((link) => (
                <Typography
                  key={link.label}
                  variant="body2"
                  component="a"
                  href={link.link.toString()}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  sx={{
                    color: "text.secondary",
                    textDecoration: "none",
                    fontSize: "0.75rem",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}
