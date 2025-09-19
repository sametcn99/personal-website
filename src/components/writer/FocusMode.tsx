"use client"

import {
    Box,
    Container,
    Paper,
    TextField,
    Typography,
    IconButton,
    Tooltip,
    Chip
} from '@mui/material'
import {
    Save as SaveIcon,
    Fullscreen as FullscreenIcon,
    AspectRatio as AspectRatioIcon
} from '@mui/icons-material'
import { MarkdownPreview } from './MarkdownPreview'
import type { RefObject } from 'react'

interface FocusModeProps {
    currentEntryTitle: string
    hasUnsavedChanges: boolean
    fullscreenFullWidth: boolean
    isPreview: boolean
    content: string
    textFieldRef: RefObject<HTMLInputElement | null>
    onToggleFullWidth: () => void
    onSave: () => void
    onExitFocus: () => void
    onContentChange: (content: string) => void
    onKeyDown: (e: React.KeyboardEvent) => void
}

export function FocusMode({
    currentEntryTitle,
    hasUnsavedChanges,
    fullscreenFullWidth,
    isPreview,
    content,
    textFieldRef,
    onToggleFullWidth,
    onSave,
    onExitFocus,
    onContentChange,
    onKeyDown
}: FocusModeProps) {
    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Minimal Header for Focus Mode */}
            <Box sx={{
                p: 1,
                borderBottom: 1,
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Writer
                    </Typography>
                    {currentEntryTitle && (
                        <Chip
                            label={currentEntryTitle}
                            variant="outlined"
                            size="small"
                            color="primary"
                        />
                    )}
                    {hasUnsavedChanges && (
                        <Chip
                            label="Unsaved"
                            variant="filled"
                            size="small"
                            color="warning"
                        />
                    )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title={fullscreenFullWidth ? "Constrained Width" : "Full Width"}>
                        <IconButton
                            onClick={onToggleFullWidth}
                            size="small"
                            color={fullscreenFullWidth ? "primary" : "default"}
                        >
                            <AspectRatioIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Save (Ctrl+S)">
                        <IconButton
                            onClick={onSave}
                            disabled={!content.trim()}
                            color={hasUnsavedChanges ? "primary" : "default"}
                            size="small"
                        >
                            <SaveIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Exit Focus Mode (F11)">
                        <IconButton
                            onClick={onExitFocus}
                            size="small"
                            color="primary"
                        >
                            <FullscreenIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* Fullscreen Content Area */}
            <Box sx={{ flex: 1, overflow: 'hidden', p: 1 }}>
                <Container
                    maxWidth={fullscreenFullWidth ? false : "md"}
                    sx={{ height: '100%', px: fullscreenFullWidth ? 0 : undefined }}
                >
                    {isPreview ? (
                        <Paper
                            variant="outlined"
                            sx={{
                                height: '100%',
                                overflow: 'auto',
                                p: 3,
                                borderRadius: 1
                            }}
                        >
                            {content.trim() ? (
                                <MarkdownPreview content={content} />
                            ) : (
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '50%',
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
                        </Paper>
                    ) : (
                        <TextField
                            ref={textFieldRef}
                            fullWidth
                            multiline
                            value={content}
                            onChange={(e) => onContentChange(e.target.value)}
                            onKeyDown={onKeyDown}
                            placeholder="Start writing your markdown content here... (Press F11 to toggle fullscreen)"
                            variant="outlined"
                            sx={{
                                height: '100%',
                                '& .MuiInputBase-root': {
                                    height: '100%'
                                },
                                '& .MuiInputBase-input': {
                                    fontFamily: 'Monaco, "Cascadia Code", "Roboto Mono", monospace',
                                    fontSize: '16px',
                                    lineHeight: 1.6,
                                    height: '100% !important',
                                    overflow: 'auto !important'
                                },
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 1
                                }
                            }}
                        />
                    )}
                </Container>
            </Box>
        </Box>
    )
}