'use client'

import { Box, CircularProgress, Typography, Alert } from '@mui/material'
import { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Use dynamic import for client-side rendering of the Mermaid component
const Mermaid = dynamic(() => import('./mermaid'), {
	ssr: false,
	loading: () => (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				p: 3,
				border: 1,
				borderColor: 'grey.800',
				borderRadius: 1,
				bgcolor: 'background.paper',
				overflow: 'hidden',
				boxShadow: 1,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 2,
				}}
			>
				<CircularProgress size={24} />
				<Typography
					variant='body2'
					color='text.secondary'
				>
					Loading Mermaid diagram...
				</Typography>
			</Box>
		</Box>
	),
})

// Define comprehensive types
interface MermaidWrapperProps {
	code: any // Accept any type since we'll handle complex MDX structures
	theme?: 'default' | 'forest' | 'dark' | 'neutral' | 'base'
	maxRetries?: number
	className?: string
	errorMessages?: {
		emptyCode?: string
		renderFailed?: string
		retryButton?: string
		loading?: string
		noValidCode?: string
	}
}

/**
 * MermaidWrapper component handles processing MDX content to extract Mermaid diagram code
 * and renders it using the Mermaid component.
 */
const MermaidWrapper: React.FC<MermaidWrapperProps> = ({
	code,
	theme = 'default',
	maxRetries = 5,
	className,
	errorMessages = {
		emptyCode: 'Diagram code is empty or missing',
		renderFailed: 'Failed to render diagram',
		retryButton: 'Retry',
		loading: 'Loading diagram...',
		noValidCode: 'No valid Mermaid diagram code found',
	},
}) => {
	const [isMounted, setIsMounted] = useState(false)
	const [processedCode, setProcessedCode] = useState<string>('')
	const [processingError, setProcessingError] = useState<string | null>(null)

	// Extract Mermaid code from potentially complex MDX structures
	const extractMermaidCode = useCallback((mdxCode: any): string => {
		try {
			// Direct string code
			if (typeof mdxCode === 'string') return mdxCode.trim()

			// Not an array or object, return empty
			if (!Array.isArray(mdxCode) && typeof mdxCode !== 'object') return ''

			// Handle array structure (common in MDX)
			if (Array.isArray(mdxCode)) {
				return mdxCode
					.map((item) => {
						// Direct string content
						if (typeof item === 'string') return item

						// Handle MDX structure with nested props
						if (item?.props?.children) {
							// If children is a string
							if (typeof item.props.children === 'string') {
								return item.props.children
							}

							// If children has props (more nesting)
							if (item.props.children?.props?.children) {
								const nestedChildren = item.props.children.props.children
								return typeof nestedChildren === 'string'
									? nestedChildren
									: extractMermaidCode(nestedChildren) // Recursively extract
							}
						}
						return ''
					})
					.join('')
					.trim()
			}

			// Handle object with props directly
			if (mdxCode?.props?.children) {
				return extractMermaidCode(mdxCode.props.children)
			}

			return ''
		} catch (error) {
			// Handle any errors during extraction
			console.error('Error extracting Mermaid code:', error)
			setProcessingError('Error processing the diagram code')
			return ''
		}
	}, [])

	// Handle render events
	const handleRenderSuccess = useCallback(() => {
		// Could implement analytics tracking or other success behaviors here
		if (process.env.NODE_ENV !== 'production') {
			console.log('Mermaid diagram rendered successfully')
		}
	}, [])

	const handleRenderError = useCallback((error: Error) => {
		setProcessingError(error.message)
		if (process.env.NODE_ENV !== 'production') {
			console.error('Mermaid render error:', error)
		}
	}, [])

	// Process the code on component mount or when code prop changes
	useEffect(() => {
		try {
			// Extract and process the code
			const mermaidCode = extractMermaidCode(code)

			// Debug: Log the extracted code for troubleshooting
			if (process.env.NODE_ENV !== 'production') {
				console.log(
					'Extracted Mermaid code:',
					mermaidCode
						? mermaidCode.substring(0, 100) +
								(mermaidCode.length > 100 ? '...' : '')
						: 'empty'
				)
			}

			setProcessedCode(mermaidCode)

			if (!mermaidCode) {
				setProcessingError(
					errorMessages.noValidCode || 'No valid diagram code found'
				)
				console.warn('No valid Mermaid code was extracted from the input')
			} else {
				setProcessingError(null)
			}
		} catch (error) {
			setProcessingError('Failed to process diagram code')
			console.error('Error in Mermaid code processing:', error)
		} finally {
			setIsMounted(true)
		}
	}, [code, extractMermaidCode, errorMessages.noValidCode])

	// Show loading state while component is mounting
	if (!isMounted) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					p: 3,
					border: 1,
					borderColor: 'grey.800',
					borderRadius: 1,
					bgcolor: 'background.paper',
					overflow: 'hidden',
					boxShadow: 1,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 2,
					}}
				>
					<CircularProgress size={24} />
					<Typography
						variant='body2'
						color='text.secondary'
					>
						{errorMessages.loading}
					</Typography>
				</Box>
			</Box>
		)
	}

	// Show error state if no valid code was found
	if (!processedCode) {
		return (
			<Alert
				severity='warning'
				sx={{ mt: 2 }}
			>
				{processingError || errorMessages.noValidCode}
			</Alert>
		)
	}

	// Render the Mermaid component with the processed code
	return (
		<Mermaid
			code={processedCode}
			theme={theme}
			maxRetries={maxRetries}
			className={className}
			errorMessages={errorMessages}
			onRenderSuccess={handleRenderSuccess}
			onRenderError={handleRenderError}
		/>
	)
}

export default MermaidWrapper
