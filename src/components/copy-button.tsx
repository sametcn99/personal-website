'use client'

import { useState } from 'react'
import { IconButton, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'

interface CopyButtonProps {
	text: string
	className?: string
}

export function CopyButton({ text, className }: CopyButtonProps) {
	const [isCopied, setIsCopied] = useState(false)

	const copy = async () => {
		await navigator.clipboard.writeText(text)
		setIsCopied(true)
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
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
				className={className}
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
