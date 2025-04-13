"use client"

import type { ReactNode } from "react"
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import { usePathname } from "next/navigation"
import React, { useState } from "react"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  IconButton,
  Typography,
  Avatar,
  useTheme,
  Paper,
  alpha,
  Chip,
  Stack,
} from "@mui/material"
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  GitHub,
  LinkedIn,
  Twitter,
} from "@mui/icons-material"
import sidebarLinks from "@/data/sidebar-links.json"
import MainContent from "@/components/MainContent"
import { useIsMobile } from "@/hooks/use-mobile"
import { ThemeProvider, createTheme } from '@mui/material/styles'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// Sidebar width
const drawerWidth = 240

const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { 
      main: "#90caf9",
      light: "#b3e5fc",
      dark: "#648dae",
      contrastText: "#000000"
    },
    secondary: { 
      main: "#f48fb1", 
      light: "#f8bbd0",
      dark: "#bf6e8a",
      contrastText: "#000000"
    },
    background: { 
      default: "#121212", 
      paper: "#1e1e1e" 
    },
    text: { 
      primary: "#ffffff", 
      secondary: "#b0b0b0",
      disabled: "#6c6c6c"
    },
    error: { 
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f"
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00"
    },
    info: {
      main: "#29b6f6",
      light: "#4fc3f7",
      dark: "#0288d1"
    },
    success: {
      main: "#66bb6a",
      light: "#81c784",
      dark: "#388e3c"
    },
    divider: "rgba(255, 255, 255, 0.12)",
    action: {
      active: "#ffffff",
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      focus: "rgba(255, 255, 255, 0.12)"
    }
  },
})

export default function Layout({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const theme = useTheme()
  const [open, setOpen] = useState(!isMobile)

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  // Profile Section Component
  const ProfileSection = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        pt: 4,
      }}
    >
      <Avatar
        sx={{
          width: 90,
          height: 90,
          mb: 2,
          border: `4px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.4)}`,
        }}
        alt="Samet Can Cıncık"
        src="/placeholder.svg?height=90&width=90"
      >
        SC
      </Avatar>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          mb: 0.5,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: "text",
          textFillColor: "transparent",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Samet Can Cıncık
      </Typography>
      <Chip
        label="Web Developer"
        size="small"
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          fontWeight: 500,
          "& .MuiChip-label": { px: 1 },
        }}
      />
    </Box>
  )

  // Sidebar Footer Component
  const SidebarFooter = () => (
    <>
      <Divider sx={{ opacity: 0.6 }} />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 1.5 }}>
          <IconButton
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            <GitHub fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            <LinkedIn fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            <Twitter fontSize="small" />
          </IconButton>
        </Stack>
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          sx={{
            display: "block",
            opacity: 0.8,
          }}
        >
          © {new Date().getFullYear()} Samet Can Cıncık
        </Typography>
      </Box>
    </>
  )

  // Mobile Menu Toggle Component
  const MobileMenuToggle = () => {
    if (!isMobile) return null

    return (
      <Paper
        elevation={2}
        sx={{
          position: "fixed",
          top: 16,
          left: open ? drawerWidth + 16 : 16,
          zIndex: 1300,
          borderRadius: "50%",
          transition: theme.transitions.create(["left"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          background: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(10px)",
        }}
      >
        <IconButton
          color="primary"
          aria-label={open ? "close drawer" : "open drawer"}
          onClick={handleDrawerToggle}
          size="medium"
        >
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Paper>
    )
  }

  // Sidebar Component
  const Sidebar = () => {
    const drawer = (
      <Paper
        elevation={0}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.background.paper, 0.8)
              : alpha(theme.palette.background.paper, 0.95),
          backdropFilter: "blur(10px)",
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <ProfileSection />
        <Divider sx={{ opacity: 0.6 }} />

        <Box sx={{ flex: 1, overflowY: "auto", px: 1 }}>
          {Object.entries(sidebarLinks).map(([category, links]) => (
            <React.Fragment key={category}>
              <Typography
                variant="overline"
                sx={{
                  px: 2,
                  py: 1.5,
                  display: "block",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                  color: theme.palette.mode === "dark" ? theme.palette.primary.light : theme.palette.primary.main,
                }}
              >
                {category}
              </Typography>
              <List sx={{ py: 0 }}>
                {links.map((item) => (
                  <ListItem key={item.title} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      selected={pathname === item.href}
                      sx={{
                        borderRadius: "8px",
                        py: 1,
                        "&.Mui-selected": {
                          bgcolor: alpha(theme.palette.primary.main, 0.15),
                          color: theme.palette.primary.main,
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.25),
                          },
                        },
                        "&:hover": {
                          bgcolor: alpha(theme.palette.action.hover, 0.8),
                        },
                      }}
                      href={item.href}
                    >
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          fontSize: "0.9rem",
                          fontWeight: pathname === item.href ? 600 : 400,
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </React.Fragment>
          ))}
        </Box>

        <SidebarFooter />
      </Paper>
    )

    return (
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
          },
        }}
      >
        {drawer}
      </Drawer>
    )
  }

  // Main Content Wrapper Component
  const MainContentWrapper = () => (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        width: "100%",
        p: { xs: 2, sm: 3 },
        ml: isMobile ? 0 : `${drawerWidth}px`,
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Paper
        elevation={0}
        sx={{
          maxWidth: "lg",
          mx: "auto",
          borderRadius: 2,
          overflow: "hidden",
          height: "100%",
          background:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.background.paper, 0.6)
              : alpha(theme.palette.background.paper, 0.8),
          backdropFilter: "blur(10px)",
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <MainContent isMobile={isMobile} pathname={pathname}>
          {children}
        </MainContent>
      </Paper>
    </Box>
  )

  return (
    <ThemeProvider theme={customTheme}>
      <html lang="en" data-theme="dark">
        <head>
          <title>Samet Can Cıncık | Web Developer</title>
          <meta
            name="description"
            content="Web Developer passionate about creating compelling and user-friendly web experiences."
          />
          <meta name="keywords" content="web developer, frontend developer, react, next.js, typescript" />
          <meta name="author" content="Samet Can Cıncık" />
          <meta name="creator" content="Samet Can Cıncık" />
          <meta name="publisher" content="Samet Can Cıncık" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="format-detection" content="email=no" />
          <meta name="format-detection" content="address=no" />
          <meta property="og:title" content="Samet Can Cıncık | Web Developer" />
          <meta
            property="og:description"
            content="Web Developer passionate about creating compelling and user-friendly web experiences."
          />
          <meta property="og:site_name" content="Samet Can Cıncık" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Samet Can Cıncık | Web Developer" />
          <meta
            name="twitter:description"
            content="Web Developer passionate about creating compelling and user-friendly web experiences."
          />
        </head>
        <body className={inter.className}>
          <Box
            sx={{
              display: "flex",
              minHeight: "100vh",
              width: "100%",
              bgcolor: "background.default",
              color: "text.primary",
              position: "relative",
            }}
          >
            {/* Mobile menu toggle */}
            <MobileMenuToggle />

            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <MainContentWrapper />
          </Box>
          <Analytics />
        </body>
      </html>
    </ThemeProvider>
  )
}
