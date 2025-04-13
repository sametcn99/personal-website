import { Box } from '@mui/material'

export default function MdxLayout({ children }: { children: React.ReactNode }) {
	return (
		<Box
			component='main'
			sx={{
				position: 'relative',
				mx: 'auto',
				width: 'fit-content',
				px: 2,
				'@media print': {
					mx: 0,
					px: 0,
					bgcolor: 'white',
					color: 'black',
				},
			}}
		>
			<Box
				sx={{
					'& .prose': {
						'& h1': { my: 0 },
						'& h2': { my: 2 },
						'& p': { my: 0 },
						'& hr': { my: 6 },
					},
					'@media print': {
						m: '0 !important',
						p: '0 !important',
					},
				}}
			>
				{children}
			</Box>
		</Box>
	)
}
