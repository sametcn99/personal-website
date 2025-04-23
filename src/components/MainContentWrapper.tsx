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
		<MainContent
			isMobile={isMobile}
			pathname={pathname}
		>
			{children}
		</MainContent>
	)
}

export default MainContentWrapper
