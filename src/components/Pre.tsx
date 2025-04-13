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
	// Extract the code content from the child element
	let code = ''

	// Find the code element and extract its content
	Children.forEach(children, (child) => {
		if (isValidElement(child) && child.type === 'code') {
			// Cast to ReactElement with CodeProps to avoid TypeScript errors
			const codeElement = child as ReactElement<CodeProps>
			code = codeElement.props.children as string

			if (typeof code !== 'string') {
				// If code is not a string (e.g., it contains elements like spans for syntax highlighting)
				// Try to extract the text content from it
				code = ''
				const extractText = (node: ReactNode): void => {
					if (typeof node === 'string') {
						code += node
					} else if (Array.isArray(node)) {
						node.forEach(extractText)
					} else if (isValidElement(node)) {
						// Cast to ReactElement with ElementProps to avoid TypeScript errors
						const element = node as ReactElement<ElementProps>
						extractText(element.props.children)
					}
				}

				extractText(codeElement.props.children)
			}
		}
	})

	return (
		<Box
			className='group'
			sx={{
				position: 'relative',
			}}
		>
			<Box
				component='pre'
				{...props}
				sx={{
					position: 'relative',
					overflow: 'auto',
					borderRadius: 1,
					p: 2,
					bgcolor: 'grey.900',
				}}
			>
				{children}
			</Box>
		</Box>
	)
}
