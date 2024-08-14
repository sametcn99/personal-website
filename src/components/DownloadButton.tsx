'use client'
export default function DownloadButton() {
	const handleDownload = () => {
		window.print()
	}

	return (
		<button
			onClick={handleDownload}
			className='fixed bottom-4 right-4 rounded-xl bg-purple-950 p-3 text-white transition-all duration-700 hover:bg-black/30 dark:hover:bg-white/30 print:hidden'
		>
			Kaydet
		</button>
	)
}
