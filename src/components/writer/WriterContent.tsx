"use client"

import { Box, Paper, TextField, Typography } from '@mui/material'
import { MarkdownPreview } from './MarkdownPreview'
import type { RefObject } from 'react'

interface WriterContentProps {
    isPreview: boolean
    content: string
    textFieldRef: RefObject<HTMLInputElement | null>
    onContentChange: (content: string) => void
    onKeyDown: (e: React.KeyboardEvent) => void
}

export function WriterContent({
    isPreview,
    content,
    textFieldRef,
    onContentChange,
    onKeyDown
}: WriterContentProps) {
    if (isPreview) {
        return (
            <Box
                sx={{
                    height: '100%',
                    overflow: 'auto',
                    p: 3,
                    borderRadius: 2,
                }}
            >
                {content.trim() ? (
                    <MarkdownPreview content={content} />
                ) : (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '200px',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <Typography variant="h6" color="text.secondary">
                            Nothing to preview
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Write some markdown content first.
                        </Typography>
                    </Box>
                )}
            </Box>
        )
    }

    return (
        <TextField
            ref={textFieldRef}
            fullWidth
            multiline
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Start writing your markdown content here... (Press F11 for fullscreen focus mode)

Try some examples:
# Heading 1
## Heading 2
**Bold text**
*Italic text*
`Code`
- List item
1. Numbered list
> Blockquote"
            variant="outlined"
            sx={{
                height: '100%',
                '& .MuiInputBase-root': {
                    height: '100%'
                },
                '& .MuiInputBase-input': {
                    fontFamily: 'Monaco, "Cascadia Code", "Roboto Mono", monospace',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    height: '100% !important',
                    overflow: 'auto !important'
                },
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover': {
                        borderColor: 'primary.main'
                    },
                    '&.Mui-focused': {
                        borderColor: 'primary.main',
                        boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)'
                    }
                }
            }}
        />
    )
}