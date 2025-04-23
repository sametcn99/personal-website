'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import { useIsMobile } from '@/hooks/use-mobile'

export default function Breadcrumb() {
	const pathname = usePathname()
	const isMobile = useIsMobile()

	// Generate breadcrumb items
	const pathSegments = pathname.split('/').filter((segment) => segment)
	const breadcrumbItems = pathSegments.map((segment, index) => {
		const href = '/' + pathSegments.slice(0, index + 1).join('/')
		const isLast = index === pathSegments.length - 1

		return isLast ? (
			<Typography
				key={href}
				color='text.primary'
			>
				{segment.charAt(0).toUpperCase() + segment.slice(1)}
			</Typography>
		) : (
			<Link
				key={href}
				component={NextLink}
				href={href}
				underline='hover'
				color='inherit'
			>
				{segment.charAt(0).toUpperCase() + segment.slice(1)}
			</Link>
		)
	})

	return (
		<Breadcrumbs
			aria-label='breadcrumb'
			sx={{ mb: 2, mt: 2, ml: isMobile ? 2 : 0 }} // Add some margin
		>
			<Link
				component={NextLink}
				href='/'
				underline='hover'
				color='inherit'
			>
				Home
			</Link>
			{breadcrumbItems}
		</Breadcrumbs>
	)
}
