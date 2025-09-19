"use client"

import { Alert } from '@mui/material'

interface WriterStatusAlertsProps {
    hasUnsavedChanges: boolean
}

export function WriterStatusAlerts({ hasUnsavedChanges }: WriterStatusAlertsProps) {
    if (!hasUnsavedChanges) {
        return null
    }

    return (
        <Alert severity="warning" variant="outlined" sx={{ borderRadius: 2 }}>
            You have unsaved changes
        </Alert>
    )
}