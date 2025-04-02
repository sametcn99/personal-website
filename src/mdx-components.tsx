import React from 'react'
import type { MDXComponents } from 'mdx/types'
import Pre from './components/Pre'
import Link from 'next/link'

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
				className="scroll-m-20 text-3xl font-bold tracking-tight mb-4"
				{...props}
			>
				{children}
			</h1>
		),
		h2: ({ children, ...props }) => (
			<h2
				id={generateId(String(children))}
				className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight mt-8 mb-4"
				{...props}
			>
				{children}
			</h2>
		),
		h3: ({ children, ...props }) => (
			<h3
				id={generateId(String(children))}
				className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-3"
				{...props}
			>
				{children}
			</h3>
		),
		p: ({ children, ...props }) => (
			<p className="leading-7 [&:not(:first-child)]:mt-4" {...props}>
				{children}
			</p>
		),
		ul: ({ children, ...props }) => (
			<ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
				{children}
			</ul>
		),
		ol: ({ children, ...props }) => (
			<ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
				{children}
			</ol>
		),
		li: ({ children, ...props }) => (
			<li {...props}>{children}</li>
		),
		blockquote: ({ children, ...props }) => (
			<blockquote className="border-l-4 border-gray-300 pl-4 dark:border-gray-700" {...props}>
				{children}
			</blockquote>
		),
		a: ({ children, href, ...props }) => {
			if (href && href.startsWith('/')) {
				return (
					<Link href={href} className="font-medium text-blue-600 underline underline-offset-4 dark:text-blue-400" {...props}>
						{children}
					</Link>
				)
			}
			return (
				<a 
					href={href} 
					className="font-medium text-blue-600 underline underline-offset-4 dark:text-blue-400" 
					target="_blank" 
					rel="noopener noreferrer"
					{...props}
				>
					{children}
				</a>
			)
		},
		pre: (props) => <Pre {...props} />,
		code: ({ children, ...props }) => (
			<code 
				className="relative rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-gray-900 dark:bg-gray-800 dark:text-gray-100" 
				{...props}
			>
				{children}
			</code>
		),
		table: ({ children, ...props }) => (
			<div className="my-6 w-full overflow-y-auto">
				<table className="w-full" {...props}>
					{children}
				</table>
			</div>
		),
		th: ({ children, ...props }) => (
			<th className="border border-gray-200 px-4 py-2 text-left font-bold dark:border-gray-800" {...props}>
				{children}
			</th>
		),
		td: ({ children, ...props }) => (
			<td className="border border-gray-200 px-4 py-2 text-left dark:border-gray-800" {...props}>
				{children}
			</td>
		),
		hr: (props) => <hr className="my-6 border-gray-200 dark:border-gray-800" {...props} />,
	}
}
