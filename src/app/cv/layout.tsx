import DownloadButton from '@/components/DownloadButton'

export default function MdxLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='relative mx-auto w-fit px-2'>
			<div className='prose dark:prose-invert prose-h1:my-0 prose-h2:my-2 prose-p:my-0 prose-hr:my-6'>
				{children}
			</div>
			<DownloadButton />
		</main>
	)
}
