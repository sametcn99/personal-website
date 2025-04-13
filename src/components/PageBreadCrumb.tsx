'use client'
import {
	Breadcrumbs,
	Link,
	Typography,
	Box,
} from '@mui/material'
import NextLink from 'next/link'

export default function PageBreadcrumb({ path }: { path: string }) {
	// Remove trailing slash and split path
	const pathSegments = path.replace(/\/$/, '').split('/').filter(Boolean)

	if (pathSegments.length === 0) return null

	return (
		<Box
			className='print:hidden'
			sx={{ mb: 2 }}
		>
			<Breadcrumbs aria-label='breadcrumb'>
				<Link
					component={NextLink}
					underline='hover'
					color='inherit'
					href='/'
				>
					Home
				</Link>
				{pathSegments.map((segment, i) => {
					const isLast = i === pathSegments.length - 1
					const href = `/${pathSegments.slice(0, i + 1).join('/')}`

					return isLast ? (
						<Typography
							key={segment}
							color='text.primary'
						>
							{segment.replace(/-/g, ' ')}
						</Typography>
					) : (
						<Link
							component={NextLink}
							underline='hover'
							color='inherit'
							href={href}
							key={segment}
						>
							{segment.replace(/-/g, ' ')}
						</Link>
					)
				})}
			</Breadcrumbs>
		</Box>
	)
}
