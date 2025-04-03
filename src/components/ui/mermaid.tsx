'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import mermaid, { MermaidConfig } from 'mermaid'
import { cn } from '@/lib/utils'
import { useMermaidStore } from '@/lib/stores/mermaid-store'
import CopyButton from '../CopyButton'

interface MermaidProps {
  code: string
  config?: MermaidConfig
  className?: string
}

export function Mermaid({ code, config, className }: MermaidProps) {
  const [error, setError] = useState<string | null>(null)
  const [isRendered, setIsRendered] = useState(false)
  const [showErrorDetails, setShowErrorDetails] = useState(false)
  const diagramRef = useRef<HTMLDivElement>(null)
  const id = `mermaid-${Math.random().toString(36).slice(2)}`
  
  const { 
    scale, 
    translateX, 
    translateY, 
    isPanning,
    setScale,
    setTranslate,
    setIsPanning,
    reset 
  } = useMermaidStore()

  const initializeMermaid = useCallback(async () => {
    try {
      const defaultConfig: MermaidConfig = {
        theme: 'default',
        securityLevel: 'loose',
        startOnLoad: false,
        flowchart: {
          useMaxWidth: false,
          htmlLabels: true,
        },
      }

      mermaid.initialize({
        ...defaultConfig,
        ...config,
      })

      await mermaid.run({
        nodes: [document.getElementById(id)!],
        suppressErrors: false,
      })

      setIsRendered(true)
      setError(null)
    } catch (err) {
      console.error('Mermaid rendering error:', err)
      setError(err instanceof Error ? err.message : 'Failed to render diagram')
    }
  }, [config, id])

  useEffect(() => {
    initializeMermaid()
  }, [initializeMermaid, code])

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault()
      const delta = -Math.sign(e.deltaY) * 0.1
      const newScale = scale * (1 + delta)
      if (newScale >= 0.2 && newScale <= 10) {
        setScale(newScale)
      }
    } else {
      setTranslate(
        translateX - e.deltaX / scale,
        translateY - e.deltaY / scale
      )
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return
    setTranslate(
      translateX + e.movementX / scale,
      translateY + e.movementY / scale
    )
  }

  const handleMouseUp = () => {
    setIsPanning(false)
  }

  const zoomIn = () => setScale(scale * 1.2)
  const zoomOut = () => scale > 0.2 && setScale(scale / 1.2)

  return (
    <div className={cn('relative group', className)}>
      {error ? (
        <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>Failed to render diagram</span>
            <button 
              onClick={() => setShowErrorDetails(!showErrorDetails)}
              className="text-sm underline ml-2"
            >
              {showErrorDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
          {showErrorDetails && (
            <pre className="mt-2 p-2 text-sm bg-red-100 dark:bg-red-950 rounded">
              {error}
            </pre>
          )}
        </div>
      ) : (
        <>
          <div 
            className="overflow-hidden rounded-lg border dark:border-gray-800"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            ref={diagramRef}
          >
            <div
              id={id}
              className={cn(
                'mermaid opacity-0 transition-opacity duration-200',
                isRendered && 'opacity-100'
              )}
              style={{
                transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                cursor: isPanning ? 'grabbing' : 'grab',
              }}
            >
              {code}
            </div>
          </div>

          <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={zoomIn}
              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              title="Zoom in"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="11" y1="8" x2="11" y2="14"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
            </button>
            <button
              onClick={zoomOut}
              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              title="Zoom out"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                <line x1="8" y1="11" x2="14" y2="11"/>
              </svg>
            </button>
            <button
              onClick={reset}
              className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              title="Reset view"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.9 3.2L21 8"/>
                <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.9-3.2L3 16"/>
              </svg>
            </button>
            <CopyButton text={code} />
          </div>
        </>
      )}
    </div>
  )
}