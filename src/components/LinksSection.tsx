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
import { useTheme } from "@mui/material/styles";

export default function LinksSection() {
  const { showAllLinks, setShowAllLinks, linksByCategory, hiddenLinks } =
    useLinks();
  const theme = useTheme();

  return (
    <Box flex={{ xs: 1, md: "1 1 50%" }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          height: "fit-content",
          backgroundColor: "transparent",
          border: "1px solid",
          borderColor: "divider",
        }}
        variant="outlined"
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 600,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <OpenInNewIcon sx={{ color: theme.palette.primary.main }} />
          Connect With Me
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Find me on various platforms and social networks
        </Typography>

        {Object.entries(linksByCategory).map(([category, links]) => (
          <Box key={category} sx={{ mb: 3 }}>
            <Chip
              label={category}
              size="small"
              sx={{
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                border: "1px solid",
                borderColor: "primary.main",
                color: "primary.main",
                fontWeight: 600,
              }}
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
                      borderRadius: 2,
                      mb: 1,
                      border: "1px solid transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main}10`,
                        borderColor: "primary.main",
                        transform: "translateX(8px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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
                          fontWeight: 500,
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
          <Box
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
              p: 1,
              borderRadius: 1,
              minHeight: 44, // Better touch target for mobile
              minWidth: 44, // Better touch target for mobile
              "&:hover": {
                color: "text.primary",
                backgroundColor: "action.hover",
              },
              "&:active": {
                backgroundColor: "action.selected",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: 2,
              },
            }}
            aria-label={
              showAllLinks ? "Hide additional links" : "Show all links"
            }
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
            <Typography variant="caption" sx={{ fontSize: "0.8rem" }}>
              {showAllLinks ? "hide" : "see all"}
            </Typography>
          </Box>
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
