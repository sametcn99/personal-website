'use client'
import { FaRegFilePdf } from 'react-icons/fa6'
import { Button } from './ui/button'

export default function DownloadButton() {
	const handleDownload = () => {
		window.print()
	}

	return (
		<Button
			onClick={handleDownload}
			className='fixed right-4 bottom-4 print:hidden '
		>
			<FaRegFilePdf
				className='inline'
				size={24}
			/>
			<span className='hidden font-semibold md:block'>PDF</span>
		</Button>
	)
}
