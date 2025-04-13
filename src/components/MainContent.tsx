'use client'

import { Box, Container } from '@mui/material'
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
				px: { xs: 2, md: 4 },
				py: 4,
			}}
		>
			<Container maxWidth='lg'>
				<Box
					sx={{
						display: { xs: 'flex', md: 'none' },
						mb: 2,
						alignItems: 'center',
					}}
				>
					{/* Mobile sidebar trigger is now inside the MobileSidebar component */}
				</Box>
				<Box>{children}</Box>
			</Container>
		</Box>
	)
}

export default MainContent
