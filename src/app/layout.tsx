'use client'

import MainContentWrapper from '@/components/MainContentWrapper'
import MobileMenuToggle from '@/components/MobileMenuToggle'
import { ThemeProvider } from '@mui/material/styles'
import { Analytics } from '@vercel/analytics/react'
import Breadcrumb from '@/components/Breadcrumb'
import { usePathname } from 'next/navigation'
import { Box, useTheme } from '@mui/material'
import Metadata from '@/components/Metadata'
import { customTheme } from '@/theme/theme'
import Sidebar from '@/components/Sidebar'
import { Inter } from 'next/font/google'
import React, { useState } from 'react'
import type { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: ReactNode }) {
	const pathname = usePathname()
	const [open, setOpen] = useState(false)

	const handleDrawerToggle = () => {
		setOpen(!open)
	}

	return (
		<ThemeProvider theme={customTheme}>
			<html
				lang='en'
				data-theme='dark'
			>
				<Metadata />
				<body className={inter.className}>
					<>
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
					</>
					<Analytics />
				</body>
			</html>
		</ThemeProvider>
	)
}
