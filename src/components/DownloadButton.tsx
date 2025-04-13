'use client'
import { FaRegFilePdf } from 'react-icons/fa6'
import { Button, Box } from '@mui/material'

export default function DownloadButton() {
	const handleDownload = () => {
		window.print()
	}

	return (
		<Button
			onClick={handleDownload}
			sx={{
				position: 'fixed',
				right: 4,
				bottom: 4,
				'@media print': {
					display: 'none',
				},
			}}
			startIcon={<FaRegFilePdf size={24} />}
		>
			<Box
				sx={{
					display: { xs: 'none', md: 'block' },
					fontWeight: 600,
				}}
			>
				PDF
			</Box>
		</Button>
	)
}
