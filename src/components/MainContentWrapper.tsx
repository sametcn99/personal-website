'use client'
import { Box, Paper, alpha, useTheme } from '@mui/material'
import MainContent from '@/components/MainContent'
import { useIsMobile } from '@/hooks/use-mobile'
import React, { ReactNode } from 'react'

interface MainContentWrapperProps {
	children: ReactNode
	pathname: string
}

const MainContentWrapper: React.FC<MainContentWrapperProps> = ({
	children,
	pathname,
}) => {
	const theme = useTheme()
	const isMobile = useIsMobile()
	return (
		<Box
			component='main'
			sx={{
				flexGrow: 1,
				width: '100%',
				p: { xs: 2, sm: 3 },
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
}

export default MainContentWrapper
