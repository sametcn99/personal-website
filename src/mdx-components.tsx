import React from 'react'
import type { MDXComponents } from 'mdx/types'

function generateId(text: string): string {
	return text
		.toLowerCase()
		.replace(/ğ/g, 'g')
		.replace(/ü/g, 'u')
		.replace(/ş/g, 's')
		.replace(/ı/g, 'i')
		.replace(/ö/g, 'o')
		.replace(/ç/g, 'c')
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		h1: ({ children, ...props }) => (
			<h1
				id={generateId(String(children))}
				{...props}
			>
				{children}
			</h1>
		),
		h2: ({ children, ...props }) => (
			<h2
				id={generateId(String(children))}
				{...props}
			>
				{children}
			</h2>
		),
	}
}
