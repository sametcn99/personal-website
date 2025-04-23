'use client'

import { Breadcrumbs, Typography } from '@mui/material'
import { useIsMobile } from '@/hooks/use-mobile'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Breadcrumb() {
	const pathname = usePathname()
	const isMobile = useIsMobile()

	// Generate breadcrumb items
	const pathSegments = pathname.split('/').filter((segment) => segment)
	const breadcrumbItems = pathSegments.map((segment, index) => {
		const href = '/' + pathSegments.slice(0, index + 1).join('/')

		return (
			<Typography
				key={href}
				color='text.primary'
			>
				{segment.charAt(0).toUpperCase() + segment.slice(1)}
			</Typography>
		)
	})

	return (
		<Breadcrumbs
			aria-label='breadcrumb'
			sx={{ mb: 2, mt: 2, ml: isMobile ? 2 : 0 }} // Add some margin
		>
			<Typography>Home</Typography>
			{breadcrumbItems}
		</Breadcrumbs>
	)
}
