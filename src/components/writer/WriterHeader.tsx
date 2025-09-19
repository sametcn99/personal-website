"use client"

import {
    Box,
    Typography,
    Chip,
    IconButton,
    Tooltip
} from '@mui/material'
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Fullscreen as FullscreenIcon
} from '@mui/icons-material'

interface WriterHeaderProps {
    currentEntryTitle: string
    hasUnsavedChanges: boolean
    isHeaderCollapsed: boolean
    focusMode: boolean
    onToggleCollapse: () => void
    onToggleFullscreen: () => void
}

export function WriterHeader({
    currentEntryTitle,
    hasUnsavedChanges,
    isHeaderCollapsed,
    focusMode,
    onToggleCollapse,
    onToggleFullscreen
}: WriterHeaderProps) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
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
                <Tooltip title="Focus Mode (F11)">
                    <IconButton
                        onClick={onToggleFullscreen}
                        size="small"
                        color={focusMode ? "primary" : "default"}
                    >
                        <FullscreenIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title={isHeaderCollapsed ? "Show Controls" : "Hide Controls"}>
                    <IconButton
                        onClick={onToggleCollapse}
                        size="small"
                    >
                        {isHeaderCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    )
}