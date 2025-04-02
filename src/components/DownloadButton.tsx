'use client'
import { FaRegFilePdf } from 'react-icons/fa6'

export default function DownloadButton() {
	const handleDownload = () => {
		window.print()
	}

	return (
		<button
			onClick={handleDownload}
			className='fixed right-4 bottom-4 inline-flex gap-2 rounded-xl border border-white/30 p-3 text-white backdrop-blur-sm transition-all duration-700 hover:cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 print:hidden'
		>
			<FaRegFilePdf
				className='inline'
				size={24}
			/>
			<span className='hidden font-semibold md:block'>Save</span>
		</button>
	)
}
