"use client"

import { useState, useRef, useEffect } from 'react'
import {
    Box,
    Paper,
    TextField,
    Button,
    ButtonGroup,
    Typography,
    Divider,
    Alert,
    Container,
    Tooltip,
    Collapse,
    IconButton,
    Card,
    CardContent,
    Chip
} from '@mui/material'
import {
    Preview as PreviewIcon,
    Edit as EditIcon,
    Save as SaveIcon,
    FolderOpen as LoadIcon,
    Add as NewIcon,
    Undo as UndoIcon,
    Redo as RedoIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Fullscreen as FullscreenIcon,
    AspectRatio as AspectRatioIcon
} from '@mui/icons-material'
import { MarkdownPreview } from './MarkdownPreview'
import { SaveDialog } from './SaveDialog'
import { LoadDialog } from './LoadDialog'
import { useWriter } from '../../hooks/useWriter'

export function WriterEditor() {
    const {
        content,
        isPreview,
        hasUnsavedChanges,
        currentEntryId,
        entries,
        canUndo,
        canRedo,
        saveEntry,
        loadEntry,
        deleteEntry,
        newEntry,
        togglePreview,
        updateContent,
        undo,
        redo
    } = useWriter()

    const [showSaveDialog, setShowSaveDialog] = useState(false)
    const [showLoadDialog, setShowLoadDialog] = useState(false)
    const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false)
    const [focusMode, setFocusMode] = useState(false)
    const [fullscreenFullWidth, setFullscreenFullWidth] = useState(false)
    const textFieldRef = useRef<HTMLInputElement>(null)

    // Fullscreen detection and F11 handling
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFullscreen = document.fullscreenElement !== null
            setFocusMode(isFullscreen)
            if (isFullscreen) {
                setIsHeaderCollapsed(true)
            }
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'F11') {
                e.preventDefault()
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen()
                } else {
                    document.exitFullscreen()
                }
            }
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const getCurrentEntryTitle = () => {
        if (currentEntryId) {
            const entry = entries.find(e => e.id === currentEntryId)
            return entry?.title || ''
        }
        return ''
    }

    const handleQuickSave = () => {
        if (currentEntryId) {
            // Update existing entry with same title
            const currentEntry = entries.find(e => e.id === currentEntryId)
            if (currentEntry) {
                saveEntry(currentEntry.title)
            }
        } else {
            // Show dialog for new entry
            setShowSaveDialog(true)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Ctrl+S for save
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault()
            handleQuickSave()
        }
        // Ctrl+Z for undo
        else if (e.ctrlKey && !e.shiftKey && e.key === 'z') {
            e.preventDefault()
            undo()
        }
        // Ctrl+Shift+Z or Ctrl+Y for redo
        else if ((e.ctrlKey && e.shiftKey && e.key === 'Z') || (e.ctrlKey && e.key === 'y')) {
            e.preventDefault()
            redo()
        }
    }

    return (
        <Box sx={{
            height: '100vh',
            overflow: 'hidden',
            ...(focusMode && {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                backgroundColor: 'background.default'
            })
        }}>
            {focusMode ? (
                // Fullscreen Focus Mode Layout
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
                            {currentEntryId && (
                                <Chip
                                    label={getCurrentEntryTitle()}
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
                                    onClick={() => setFullscreenFullWidth(!fullscreenFullWidth)}
                                    size="small"
                                    color={fullscreenFullWidth ? "primary" : "default"}
                                >
                                    <AspectRatioIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Save (Ctrl+S)">
                                <IconButton
                                    onClick={handleQuickSave}
                                    disabled={!content.trim()}
                                    color={hasUnsavedChanges ? "primary" : "default"}
                                    size="small"
                                >
                                    <SaveIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Exit Focus Mode (F11)">
                                <IconButton
                                    onClick={() => {
                                        if (document.fullscreenElement) {
                                            document.exitFullscreen()
                                        } else {
                                            setFocusMode(false)
                                        }
                                    }}
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
                                    onChange={(e) => updateContent(e.target.value)}
                                    onKeyDown={handleKeyDown}
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
            ) : (
                // Normal Mode Layout
                <Container maxWidth="md" sx={{ py: 2, height: '100vh', overflow: 'auto' }}>
                    <Card elevation={2} sx={{ height: 'calc(100vh - 32px)', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            {/* Header Section */}
                            <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                                            Writer
                                        </Typography>
                                        {currentEntryId && (
                                            <Chip
                                                label={getCurrentEntryTitle()}
                                                variant="outlined"
                                                size="small"
                                                color="primary"
                                            />
                                        )}
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Tooltip title="Focus Mode (F11)">
                                            <IconButton
                                                onClick={() => {
                                                    document.documentElement.requestFullscreen()
                                                }}
                                                size="small"
                                                color={focusMode ? "primary" : "default"}
                                            >
                                                <FullscreenIcon />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title={isHeaderCollapsed ? "Show Controls" : "Hide Controls"}>
                                            <IconButton
                                                onClick={() => setIsHeaderCollapsed(!isHeaderCollapsed)}
                                                size="small"
                                            >
                                                {isHeaderCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>

                                <Collapse in={!isHeaderCollapsed}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {/* Status Alerts */}
                                        {hasUnsavedChanges && (
                                            <Alert severity="warning" variant="outlined" sx={{ borderRadius: 2 }}>
                                                You have unsaved changes
                                            </Alert>
                                        )}

                                        {/* Action Buttons */}
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'space-between' }}>
                                            {/* Main Actions */}
                                            <ButtonGroup variant="outlined" size="small">
                                                <Tooltip title="New Entry">
                                                    <Button
                                                        startIcon={<NewIcon />}
                                                        onClick={newEntry}
                                                        disabled={!hasUnsavedChanges && !content.trim()}
                                                    >
                                                        New
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="Load Entry">
                                                    <Button
                                                        startIcon={<LoadIcon />}
                                                        onClick={() => setShowLoadDialog(true)}
                                                    >
                                                        Load
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="Save Entry (Ctrl+S)">
                                                    <Button
                                                        startIcon={<SaveIcon />}
                                                        onClick={handleQuickSave}
                                                        disabled={!content.trim()}
                                                        color={hasUnsavedChanges ? 'primary' : 'inherit'}
                                                        variant={hasUnsavedChanges ? 'contained' : 'outlined'}
                                                    >
                                                        Save
                                                    </Button>
                                                </Tooltip>
                                            </ButtonGroup>

                                            {/* Editor Actions */}
                                            <ButtonGroup variant="outlined" size="small">
                                                <Tooltip title="Undo (Ctrl+Z)">
                                                    <Button
                                                        startIcon={<UndoIcon />}
                                                        onClick={undo}
                                                        disabled={!canUndo || isPreview}
                                                    >
                                                        Undo
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="Redo (Ctrl+Shift+Z)">
                                                    <Button
                                                        startIcon={<RedoIcon />}
                                                        onClick={redo}
                                                        disabled={!canRedo || isPreview}
                                                    >
                                                        Redo
                                                    </Button>
                                                </Tooltip>
                                                <Tooltip title="Toggle Preview">
                                                    <Button
                                                        startIcon={isPreview ? <EditIcon /> : <PreviewIcon />}
                                                        onClick={togglePreview}
                                                        disabled={!content.trim()}
                                                        variant={isPreview ? 'contained' : 'outlined'}
                                                        color={isPreview ? 'primary' : 'inherit'}
                                                    >
                                                        {isPreview ? 'Edit' : 'Preview'}
                                                    </Button>
                                                </Tooltip>
                                            </ButtonGroup>
                                        </Box>
                                    </Box>
                                </Collapse>

                                <Divider sx={{ mt: 2 }} />
                            </Box>

                            {/* Content Area - Normal Mode */}
                            <Box sx={{ flex: 1, overflow: 'hidden' }}>
                                {isPreview ? (
                                    <Paper
                                        variant="outlined"
                                        sx={{
                                            height: '100%',
                                            overflow: 'auto',
                                            p: 3,
                                            borderRadius: 2,
                                            backgroundColor: 'grey.50'
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
                                    </Paper>
                                ) : (
                                    <TextField
                                        ref={textFieldRef}
                                        fullWidth
                                        multiline
                                        value={content}
                                        onChange={(e) => updateContent(e.target.value)}
                                        onKeyDown={handleKeyDown}
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
                                )}
                            </Box>
                        </CardContent>
                    </Card>

                    <SaveDialog
                        isOpen={showSaveDialog}
                        onClose={() => setShowSaveDialog(false)}
                        onSave={saveEntry}
                        currentTitle={getCurrentEntryTitle()}
                    />

                    <LoadDialog
                        isOpen={showLoadDialog}
                        onClose={() => setShowLoadDialog(false)}
                        onLoad={loadEntry}
                        onDelete={deleteEntry}
                        entries={entries}
                    />
                </Container>
            )}
        </Box>
    )
}