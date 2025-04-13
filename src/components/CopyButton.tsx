'use client'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { IconButton, Tooltip } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { useState } from 'react'
import { toast } from 'sonner'

interface CopyButtonProps {
	text: string
}

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
		<Tooltip
			title={isCopied ? 'Copied!' : 'Copy to clipboard'}
			placement='top'
			arrow
		>
			<IconButton
				aria-label='copy'
				onClick={copy}
				disabled={isCopied}
				className='absolute top-3 right-3 rounded-md p-2 transition-colors   text-gray-400 hover:bg-gray-800 hover:text-gray-50'
			>
				{isCopied ? (
					<CheckIcon sx={{ color: 'success.main' }} />
				) : (
					<ContentCopyIcon />
				)}
			</IconButton>
		</Tooltip>
	)
}
