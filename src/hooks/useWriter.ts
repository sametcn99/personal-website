"use client"

import { useState, useEffect, useCallback } from 'react'

interface WriterEntry {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

const STORAGE_KEY = 'writer-entries'

export function useWriter() {
  const [content, setContent] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null)
  const [entries, setEntries] = useState<WriterEntry[]>([])
  
  // Undo/Redo history
  const [history, setHistory] = useState<string[]>([''])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Load entries from localStorage on mount
  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem(STORAGE_KEY)
      if (savedEntries) {
        const parsedEntries = JSON.parse(savedEntries).map((entry: Omit<WriterEntry, 'createdAt' | 'updatedAt'> & { createdAt: string; updatedAt: string }) => ({
          ...entry,
          createdAt: new Date(entry.createdAt),
          updatedAt: new Date(entry.updatedAt)
        }))
        setEntries(parsedEntries)
      }
    } catch (error) {
      console.error('Error loading entries from localStorage:', error)
    }
  }, [])

  // Track unsaved changes and add beforeunload listener
  useEffect(() => {
    if (currentEntryId) {
      const currentEntry = entries.find(entry => entry.id === currentEntryId)
      setHasUnsavedChanges(currentEntry ? currentEntry.content !== content : content.trim() !== '')
    } else {
      setHasUnsavedChanges(content.trim() !== '')
    }
  }, [content, currentEntryId, entries])

  // Add beforeunload event listener for unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?'
        return 'You have unsaved changes. Are you sure you want to leave?'
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasUnsavedChanges])

  const saveToLocalStorage = useCallback((entriesToSave: WriterEntry[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entriesToSave))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [])

  const saveEntry = useCallback((title?: string) => {
    if (!content.trim()) return

    const now = new Date()
    const entryTitle = title || `Entry ${new Date().toLocaleDateString()}`

    if (currentEntryId) {
      // Update existing entry
      const updatedEntries = entries.map(entry => 
        entry.id === currentEntryId 
          ? { ...entry, content, title: entryTitle, updatedAt: now }
          : entry
      )
      setEntries(updatedEntries)
      saveToLocalStorage(updatedEntries)
    } else {
      // Create new entry
      const newEntry: WriterEntry = {
        id: Date.now().toString(),
        title: entryTitle,
        content,
        createdAt: now,
        updatedAt: now
      }
      const updatedEntries = [...entries, newEntry]
      setEntries(updatedEntries)
      setCurrentEntryId(newEntry.id)
      saveToLocalStorage(updatedEntries)
    }
    
    setHasUnsavedChanges(false)
  }, [content, currentEntryId, entries, saveToLocalStorage])

  const loadEntry = useCallback((entryId: string) => {
    const entry = entries.find(e => e.id === entryId)
    if (entry) {
      setContent(entry.content)
      setCurrentEntryId(entryId)
      setHasUnsavedChanges(false)
      setIsPreview(false)
      // Reset history for loaded content
      setHistory([entry.content])
      setHistoryIndex(0)
    }
  }, [entries])

  const deleteEntry = useCallback((entryId: string) => {
    const updatedEntries = entries.filter(entry => entry.id !== entryId)
    setEntries(updatedEntries)
    saveToLocalStorage(updatedEntries)
    
    if (currentEntryId === entryId) {
      setCurrentEntryId(null)
      setContent('')
      setHasUnsavedChanges(false)
    }
  }, [entries, currentEntryId, saveToLocalStorage])

  const newEntry = useCallback(() => {
    setContent('')
    setCurrentEntryId(null)
    setHasUnsavedChanges(false)
    setIsPreview(false)
    // Reset history for new entry
    setHistory([''])
    setHistoryIndex(0)
  }, [])

  const togglePreview = useCallback(() => {
    setIsPreview(prev => !prev)
  }, [])

  const updateContent = useCallback((newContent: string) => {
    setContent(newContent)
    
    // Add to history for undo/redo
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1)
      newHistory.push(newContent)
      // Keep only last 50 entries
      if (newHistory.length > 50) {
        newHistory.shift()
        return newHistory
      }
      return newHistory
    })
    setHistoryIndex(prev => Math.min(prev + 1, 49))
  }, [historyIndex])

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setContent(history[newIndex])
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setContent(history[newIndex])
    }
  }, [history, historyIndex])

  const canUndo = historyIndex > 0
  const canRedo = historyIndex < history.length - 1

  return {
    // State
    content,
    isPreview,
    hasUnsavedChanges,
    currentEntryId,
    entries,
    canUndo,
    canRedo,
    
    // Actions
    saveEntry,
    loadEntry,
    deleteEntry,
    newEntry,
    togglePreview,
    updateContent,
    undo,
    redo
  }
}