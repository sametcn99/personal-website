'use client'

import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	IconButton,
	Typography,
	useTheme,
	Paper,
	alpha,
} from '@mui/material'
import {
	Menu as MenuIcon,
	ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import sidebarLinks from '@/data/sidebar-links.json'
import { Analytics } from '@vercel/analytics/react'
import MainContent from '@/components/MainContent'
import { useIsMobile } from '@/hooks/use-mobile'
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import React, { useState } from 'react'
import type { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// Sidebar width
const drawerWidth = 240

const customTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#6ab7ff',
			light: '#a1d1ff',
			dark: '#4287c8',
			contrastText: '#121212',
		},
		secondary: {
			main: '#ff79b0',
			light: '#ffafd6',
			dark: '#c94f82',
			contrastText: '#121212',
		},
		background: {
			default: '#0a0a0a',
			paper: '#141414',
		},
		text: {
			primary: '#f8f8f8',
			secondary: '#a0a0a0',
			disabled: '#5a5a5a',
		},
		error: {
			main: '#ff5252',
			light: '#ff8080',
			dark: '#c50e29',
		},
		warning: {
			main: '#ffab40',
			light: '#ffd180',
			dark: '#c77c02',
		},
		info: {
			main: '#03a9f4',
			light: '#67daff',
			dark: '#007ac1',
		},
		success: {
			main: '#4caf50',
			light: '#80e27e',
			dark: '#087f23',
		},
		divider: 'rgba(255, 255, 255, 0.08)',
		action: {
			active: '#f8f8f8',
			hover: 'rgba(255, 255, 255, 0.1)',
			selected: 'rgba(255, 255, 255, 0.2)',
			disabled: 'rgba(255, 255, 255, 0.26)',
			disabledBackground: 'rgba(255, 255, 255, 0.08)',
			focus: 'rgba(255, 255, 255, 0.12)',
		},
	},
})

export default function Layout({ children }: { children: ReactNode }) {
	const pathname = usePathname()
	const isMobile = useIsMobile()
	const theme = useTheme()
	const [open, setOpen] = useState(!isMobile)

	const handleDrawerToggle = () => {
		setOpen(!open)
	}

	// Mobile Menu Toggle Component
	const MobileMenuToggle = () => {
		if (!isMobile) return null

		return (
			<Paper
				elevation={2}
				sx={{
					position: 'fixed',
					top: 16,
					left: open ? drawerWidth + 16 : 16,
					zIndex: 1300,
					borderRadius: '50%',
					transition: theme.transitions.create(['left'], {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.standard,
					}),
					backdropFilter: 'blur(10px)',
				}}
			>
				<IconButton
					color='primary'
					aria-label={open ? 'close drawer' : 'open drawer'}
					onClick={handleDrawerToggle}
					size='medium'
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
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				}}
			>
				{' '}
				<Box
					sx={{
						flex: 1,
						overflowY: 'auto',
						px: 1,
						'&::-webkit-scrollbar': {
							width: '6px',
						},
						'&::-webkit-scrollbar-track': {
							background: 'transparent',
						},
						'&::-webkit-scrollbar-thumb': {
							background: alpha(theme.palette.primary.main, 0.3),
							borderRadius: '3px',
						},
						'&::-webkit-scrollbar-thumb:hover': {
							background: alpha(theme.palette.primary.main, 0.5),
						},
						scrollbarWidth: 'thin',
						scrollbarColor: `${alpha(theme.palette.primary.main, 0.3)} transparent`,
					}}
				>
					{Object.entries(sidebarLinks).map(([category, links]) => (
						<React.Fragment key={category}>
							<Typography
								variant='overline'
								sx={{
									px: 2,
									py: 1.5,
									display: 'block',
									fontSize: '0.7rem',
									letterSpacing: '0.1em',
									fontWeight: 600,
									color:
										theme.palette.mode === 'dark'
											? theme.palette.primary.light
											: theme.palette.primary.main,
								}}
							>
								{category}
							</Typography>
							<List sx={{ py: 0 }}>
								{links.map((item) => (
									<ListItem
										key={item.title}
										disablePadding
										sx={{ mb: 0.5 }}
									>
										<ListItemButton
											selected={pathname === item.href}
											sx={{
												borderRadius: '8px',
												py: 1,
												'&.Mui-selected': {
													bgcolor: alpha(theme.palette.primary.main, 0.15),
													color: theme.palette.primary.main,
													'&:hover': {
														bgcolor: alpha(theme.palette.primary.main, 0.25),
													},
												},
												'&:hover': {
													bgcolor: alpha(theme.palette.action.hover, 0.8),
												},
											}}
											href={item.href}
										>
											<ListItemText
												primary={item.title}
												primaryTypographyProps={{
													fontSize: '0.9rem',
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
			</Paper>
		)

		return (
			<Drawer
				variant={isMobile ? 'temporary' : 'permanent'}
				open={open}
				onClose={isMobile ? handleDrawerToggle : undefined}
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: drawerWidth,
						boxSizing: 'border-box',
						border: 'none',
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
			component='main'
			sx={{
				flexGrow: 1,
				width: '100%',
				p: { xs: 2, sm: 3 },
				ml: isMobile ? 0 : `${drawerWidth}px`,
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
			}}
		>
			<Paper
				elevation={0}
				sx={{
					maxWidth: 'lg',
					mx: 'auto',
					borderRadius: 2,
					overflow: 'hidden',
					height: '100%',
					border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
				}}
			>
				<MainContent
					isMobile={isMobile}
					pathname={pathname}
				>
					{children}
				</MainContent>
			</Paper>
		</Box>
	)

	return (
		<ThemeProvider theme={customTheme}>
			<html
				lang='en'
				data-theme='dark'
			>
				<head>
					<title>Samet Can Cıncık | Web Developer</title>
					<meta
						name='description'
						content='Web Developer passionate about creating compelling and user-friendly web experiences.'
					/>
					<meta
						name='keywords'
						content='web developer, frontend developer, react, next.js, typescript'
					/>
					<meta
						name='author'
						content='Samet Can Cıncık'
					/>
					<meta
						name='creator'
						content='Samet Can Cıncık'
					/>
					<meta
						name='publisher'
						content='Samet Can Cıncık'
					/>
					<meta
						name='format-detection'
						content='telephone=no'
					/>
					<meta
						name='format-detection'
						content='email=no'
					/>
					<meta
						name='format-detection'
						content='address=no'
					/>
					<meta
						property='og:title'
						content='Samet Can Cıncık | Web Developer'
					/>
					<meta
						property='og:description'
						content='Web Developer passionate about creating compelling and user-friendly web experiences.'
					/>
					<meta
						property='og:site_name'
						content='Samet Can Cıncık'
					/>
					<meta
						property='og:locale'
						content='en_US'
					/>
					<meta
						property='og:type'
						content='website'
					/>
					<meta
						name='twitter:card'
						content='summary_large_image'
					/>
					<meta
						name='twitter:title'
						content='Samet Can Cıncık | Web Developer'
					/>
					<meta
						name='twitter:description'
						content='Web Developer passionate about creating compelling and user-friendly web experiences.'
					/>
				</head>
				<body className={inter.className}>
					<Box
						sx={{
							display: 'flex',
							minHeight: '100vh',
							width: '100%',
							bgcolor: 'background.default',
							color: 'text.primary',
							position: 'relative',
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
