'use client'
import { FaRegFilePdf } from 'react-icons/fa6'

export default function DownloadButton() {
	const handleDownload = () => {
		window.print()
	}

	return (
		<button
			onClick={handleDownload}
			className='fixed bottom-4 right-4 inline-flex gap-2 rounded-xl border border-white/30 bg-purple-950/40 p-3 text-white backdrop-blur-sm transition-all duration-700 hover:bg-black/10 dark:hover:bg-white/10 print:hidden'
		>
			<FaRegFilePdf
				className='inline'
				size={24}
			/>
			<span className='hidden font-semibold md:block'>Kaydet</span>
		</button>
	)
}
