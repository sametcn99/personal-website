'use client'

import { useState } from 'react'
import { toast } from 'sonner'

export default function CopyButton({ text }: { text: string }) {
	const [isCopied, setIsCopied] = useState(false)

	const copy = async () => {
		await navigator.clipboard.writeText(text)
		setIsCopied(true)
		toast.success('Code copied to clipboard', {
			duration: 2000,
			action: {
				label: 'Dismiss',
				onClick: () => toast.dismiss(),
			},
		})
		setTimeout(() => setIsCopied(false), 2000)
	}

	return (
		<button
			disabled={isCopied}
			onClick={copy}
			className='absolute top-3 right-3 rounded-md p-2 transition-colors   text-gray-400 hover:bg-gray-800 hover:text-gray-50'
			aria-label='Copy code'
			title='Copy code'
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className={`h-4 w-4 ${isCopied ? 'hidden' : 'block'}`}
			>
				<rect
					width='14'
					height='14'
					x='8'
					y='8'
					rx='2'
					ry='2'
				/>
				<path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
			</svg>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className={`h-4 w-4 text-green-500 ${isCopied ? 'block' : 'hidden'}`}
			>
				<polyline points='20 6 9 17 4 12' />
			</svg>
		</button>
	)
}
