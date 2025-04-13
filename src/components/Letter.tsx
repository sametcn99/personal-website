import { Box } from '@mui/material'

export default function Letter({
	children,
	id,
}: {
	children: React.ReactNode
	id: string
}) {
	return (
		<Box
			id={id}
			sx={{
				'@media print': {
					height: '210mm',
					width: '297mm',
				},
			}}
		>
			{children}
		</Box>
	)
}
