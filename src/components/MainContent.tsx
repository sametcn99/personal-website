'use client'

import { Box, Paper } from '@mui/material'
import type React from 'react'

interface MainContentProps {
	children: React.ReactNode
	isMobile: boolean
	pathname: string
}

const MainContent: React.FC<MainContentProps> = ({ children, pathname }) => {
	return (
		<Box
			component='main'
			sx={{
				flexGrow: 1,
				overflow: 'hidden',
			}}
		>
			<Paper
				elevation={3}
				sx={{
					maxWidth: 'lg',
					marginX: 'auto',
					padding: 2,
					borderRadius: 2,
					boxShadow: (theme) => theme.shadows[3],
					border: (theme) => `1px solid ${theme.palette.divider}`,
				}}
			>
				<Box
					sx={{
						display: { xs: 'flex', md: 'none' },
						mb: 2,
					}}
				>
					{/* Mobile sidebar trigger is now inside the MobileSidebar component */}
				</Box>
				<Box>{children}</Box>
			</Paper>
		</Box>
	)
}

export default MainContent
