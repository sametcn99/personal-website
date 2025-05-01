'use client'

import { Children, ReactNode, isValidElement, ReactElement } from 'react'
import { Box } from '@mui/material'

interface PreProps {
	children: ReactNode
	'data-language'?: string
	[key: string]: any // Allow other props
}

interface CodeProps {
	children: ReactNode
}

// Define a more generic element props interface
interface ElementProps {
	children?: ReactNode
	[key: string]: any
}

export default function Pre({ children, ...props }: PreProps) {
	return (
		<Box
			component='pre'
			{...props}
			sx={{
				position: 'relative',
				overflow: 'auto',
				borderRadius: 1,
				bgcolor: 'grey.900',
				width: '100%',
				marginX: 'auto',
			}}
		>
			{children}
		</Box>
	)
}
