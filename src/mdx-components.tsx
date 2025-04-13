import {
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Link as MuiLink,
	Divider,
	List,
	ListItem,
} from '@mui/material'
import type { MDXComponents } from 'mdx/types'
import Pre from '@/components/Pre'
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
		h1: ({ children, ...props }) => (
			<Typography
				variant='h1'
				id={generateId(String(children))}
				gutterBottom
				sx={{ fontSize: '2.5rem' }}
				{...props}
			>
				{children}
			</Typography>
		),
		h2: ({ children, ...props }) => (
			<Typography
				variant='h2'
				id={generateId(String(children))}
				sx={{
					mt: 6,
					mb: 3,
					borderBottom: 1,
					paddingBottom: 1.5,
					fontSize: '2rem',
				}}
				{...props}
			>
				{children}
			</Typography>
		),
		h3: ({ children, ...props }) => (
			<Typography
				variant='h3'
				id={generateId(String(children))}
				sx={{ mt: 5, mb: 2.5, fontSize: '1.5rem' }}
				{...props}
			>
				{children}
			</Typography>
		),
		p: ({ children, ...props }) => (
			<Typography
				variant='body1'
				sx={{ '&:not(:first-of-type)': { mt: 2 }, fontSize: '0.95rem' }}
				{...props}
			>
				{children}
			</Typography>
		),
		ul: ({ children, ...props }) => (
			<List
				component='ul'
				sx={{ my: 3, ml: 3, listStyleType: 'disc' }}
				{...props}
			>
				{children}
			</List>
		),
		ol: ({ children, ...props }) => (
			<List
				component='ol'
				sx={{ my: 3, ml: 3, listStyleType: 'decimal' }}
				{...props}
			>
				{children}
			</List>
		),
		li: ({ children, ...props }) => (
			<ListItem
				sx={{ display: 'list-item' }}
				{...props}
			>
				{children}
			</ListItem>
		),
		blockquote: ({ children, ...props }) => (
			<Paper
				elevation={0}
				sx={{
					borderLeft: 4,
					pl: 4,
					borderColor: 'grey.500',
					fontStyle: 'italic',
				}}
				{...props}
			>
				<Typography variant='body1'>{children}</Typography>
			</Paper>
		),
		a: ({ children, href, ...props }) => {
			if (href && href.startsWith('/')) {
				return (
					<MuiLink
						href={href}
						component={Link}
						{...props}
					>
						{children}
					</MuiLink>
				)
			}
			return (
				<MuiLink
					href={href}
					target='_blank'
					rel='noopener noreferrer'
					{...props}
				>
					{children}
				</MuiLink>
			)
		},
		pre: (props) => <Pre {...props} />,
		code: ({ children, className, ...props }) => {
			return (
				<Typography
					component='code'
					{...props}
				>
					{children}
				</Typography>
			)
		},
		table: ({ children, ...props }) => (
			<TableContainer
				component={Paper}
				sx={{ my: 3 }}
			>
				<Table {...props}>{children}</Table>
			</TableContainer>
		),
		th: ({ children, ...props }) => (
			<TableCell
				sx={{ fontWeight: 'bold', border: 1, borderColor: 'grey.700' }}
				{...props}
			>
				{children}
			</TableCell>
		),
		td: ({ children, ...props }) => (
			<TableCell
				sx={{ border: 1, borderColor: 'grey.700' }}
				{...props}
			>
				{children}
			</TableCell>
		),
		hr: (props) => (
			<Divider
				sx={{ my: 3 }}
				{...props}
			/>
		),
	}
}
