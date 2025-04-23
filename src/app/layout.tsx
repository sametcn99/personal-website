'use client'

import {
	Menu as MenuIcon,
	ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material'
import MainContentWrapper from '@/components/MainContentWrapper' // Import component
import MobileMenuToggle from '@/components/MobileMenuToggle' // Import component
import { Box, useTheme, Paper, alpha } from '@mui/material'
import { customTheme, drawerWidth } from '@/theme/theme' // Import theme and drawerWidth
import { ThemeProvider } from '@mui/material/styles' // Removed createTheme
import { Analytics } from '@vercel/analytics/react'
import MainContent from '@/components/MainContent'
import Breadcrumb from '@/components/Breadcrumb' // Import Breadcrumb component
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar' // Import component
import { Inter } from 'next/font/google'
import React, { useState } from 'react'
import type { ReactNode } from 'react'
import NextLink from 'next/link' // Import NextLink for client-side navigation
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: ReactNode }) {
	const pathname = usePathname()
	const theme = useTheme() // Keep useTheme here as it might be needed by ThemeProvider context
	const [open, setOpen] = useState(false) // Changed from !isMobile to always start closed

	const handleDrawerToggle = () => {
		setOpen(!open)
	}

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
						<MobileMenuToggle
							open={open}
							handleDrawerToggle={handleDrawerToggle}
						/>

						{/* Sidebar */}
						<Sidebar
							open={open}
							handleDrawerToggle={handleDrawerToggle}
						/>

						{/* Main content */}
						<MainContentWrapper pathname={pathname}>
							{/* Breadcrumbs */}
							<Breadcrumb />
							{children}
						</MainContentWrapper>
					</Box>
					<Analytics />
				</body>
			</html>
		</ThemeProvider>
	)
}
