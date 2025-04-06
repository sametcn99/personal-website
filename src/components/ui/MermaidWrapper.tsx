'use client'

import { useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'

// Use dynamic import for client-side rendering of the Mermaid component
const Mermaid = dynamic(() => import('./mermaid'), {
	ssr: false,
	loading: () => (
		<div className='flex justify-center items-center p-6 border border-gray-800 rounded-lg bg-gray-900 dark:bg-black overflow-hidden shadow-md'>
			<div className='flex flex-col items-center gap-3'>
				<div className='h-6 w-6 border-2 border-gray-400 border-t-gray-200 dark:border-gray-700 dark:border-t-gray-500 rounded-full animate-spin'></div>
				<div className='text-gray-300 dark:text-gray-400 font-medium'>
					Loading Mermaid diagram...
				</div>
			</div>
		</div>
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
			<div className='flex justify-center items-center p-6 border border-gray-800 rounded-lg bg-gray-900 dark:bg-black overflow-hidden shadow-md'>
				<div className='flex flex-col items-center gap-3'>
					<div className='h-6 w-6 border-2 border-gray-400 border-t-gray-200 dark:border-gray-700 dark:border-t-gray-500 rounded-full animate-spin'></div>
					<div className='text-gray-300 dark:text-gray-400 font-medium'>
						{errorMessages.loading}
					</div>
				</div>
			</div>
		)
	}

	// Show error state if no valid code was found
	if (!processedCode) {
		return (
			<div className='p-4 border border-yellow-300 rounded bg-yellow-50 text-yellow-800 overflow-hidden'>
				<p>{processingError || errorMessages.noValidCode}</p>
			</div>
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
