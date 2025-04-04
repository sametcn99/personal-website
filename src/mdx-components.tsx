import { Mermaid } from '@/components/ui/mermaid'
import type { MDXComponents } from 'mdx/types'
import Pre from '@/components/Pre'
import { cn } from '@/lib/utils'
import Link from 'next/link'

function generateId(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9 ]/g, '')
		.replace(/[ ]/g, '-')
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		Mermaid,
		h1: ({ children, ...props }) => (
			<h1
				id={generateId(String(children))}
				className='mb-4 scroll-m-20 text-3xl font-bold tracking-tight'
				{...props}
			>
				{children}
			</h1>
		),
		h2: ({ children, ...props }) => (
			<h2
				id={generateId(String(children))}
				className='mt-8 mb-4 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight'
				{...props}
			>
				{children}
			</h2>
		),
		h3: ({ children, ...props }) => (
			<h3
				id={generateId(String(children))}
				className='mt-6 mb-3 scroll-m-20 text-xl font-semibold tracking-tight'
				{...props}
			>
				{children}
			</h3>
		),
		p: ({ children, ...props }) => (
			<div
				className='leading-7 [&:not(:first-child)]:mt-4'
				{...props}
			>
				{children}
			</div>
		),
		ul: ({ children, ...props }) => (
			<ul
				className='my-6 ml-6 list-disc [&>li]:mt-2'
				{...props}
			>
				{children}
			</ul>
		),
		ol: ({ children, ...props }) => (
			<ol
				className='my-6 ml-6 list-decimal [&>li]:mt-2'
				{...props}
			>
				{children}
			</ol>
		),
		li: ({ children, ...props }) => <li {...props}>{children}</li>,
		blockquote: ({ children, ...props }) => (
			<blockquote
				className='border-l-4  pl-4 border-gray-700'
				{...props}
			>
				{children}
			</blockquote>
		),
		a: ({ children, href, ...props }) => {
			if (href && href.startsWith('/')) {
				return (
					<Link
						href={href}
						className='font-medium hover:underline text-blue-400'
						{...props}
					>
						{children}
					</Link>
				)
			}
			return (
				<a
					href={href}
					className='font-medium  underline underline-offset-4 :text-blue-400'
					target='_blank'
					rel='noopener noreferrer'
					{...props}
				>
					{children}
				</a>
			)
		},
		pre: (props) => <Pre {...props} />,
		code: ({ children, className, ...props }) => {
			// Check if this is a Mermaid diagram
			if (className === 'language-mermaid') {
				return (
					<Mermaid
						code={children?.toString() ?? ''}
						className='my-6'
						{...props}
					/>
				)
			}

			const isMultiline = children?.toString().includes('\n')

			// If code is already in a code block or multiline, use simple code tag
			if (className?.includes('language-') || isMultiline) {
				return (
					<code
						className={cn(className)}
						{...props}
					>
						{children}
					</code>
				)
			}

			// Inline code styling
			return (
				<code
					className={cn(
						'relative my-0.5 inline-flex items-center justify-center rounded px-[0.4em] py-[0.2em]',
						'font-mono text-sm font-medium',
						'  bg-gray-800 text-gray-200',
						'border  border-gray-700',
						'shadow-sm transition-colors duration-100',
						className
					)}
					{...props}
				>
					{children}
				</code>
			)
		},
		table: ({ children, ...props }) => (
			<div className='my-6 w-full overflow-y-auto'>
				<table
					className='w-full'
					{...props}
				>
					{children}
				</table>
			</div>
		),
		th: ({ children, ...props }) => (
			<th
				className='border  px-4 py-2 text-left font-bold border-gray-800'
				{...props}
			>
				{children}
			</th>
		),
		td: ({ children, ...props }) => (
			<td
				className='border  px-4 py-2 text-left border-gray-800'
				{...props}
			>
				{children}
			</td>
		),
		hr: (props) => (
			<hr
				className='my-6 border-gray-800'
				{...props}
			/>
		),
	}
}
