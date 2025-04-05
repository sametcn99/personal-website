'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Mermaid = dynamic(() => import('./mermaid'), {
	ssr: false,
	loading: () => <p>Loading Mermaid diagram...</p>,
})

interface MermaidWrapperProps {
	code: any // Accept any type since we'll handle conversion
}

const MermaidWrapper: React.FC<MermaidWrapperProps> = ({ code }) => {
	const [isMounted, setIsMounted] = useState(false)
	const [processedCode, setProcessedCode] = useState<string>('')

	useEffect(() => {
		const extractMermaidCode = (mdxCode: any): string => {
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
		}

		// Extract and process the code
		const mermaidCode = extractMermaidCode(code)
		console.log('Extracted Mermaid code:', mermaidCode) // Debug
		setProcessedCode(mermaidCode)
		setIsMounted(true)
	}, [code])

	if (!isMounted) {
		return <p>Loading Mermaid diagram...</p>
	}

	if (!processedCode) {
		return <p>No valid Mermaid diagram code found</p>
	}

	return <Mermaid code={processedCode} />
}

export default MermaidWrapper
