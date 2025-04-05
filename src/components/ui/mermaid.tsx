'use client'

import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface MermaidRendererProps {
	code: string
	id?: string
}

export default function Mermaid({ code, id }: MermaidRendererProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const uniqueId = id || `mermaid-${uuidv4()}`

	useEffect(() => {
		// Function to load mermaid script dynamically
		const loadMermaidScript = (): Promise<void> => {
			return new Promise((resolve, reject) => {
				// If mermaid is already loaded, just resolve
				if (window.mermaid) {
					resolve()
					return
				}

				const script = document.createElement('script')
				script.src =
					'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js'
				script.async = true
				script.onload = () => resolve()
				script.onerror = () =>
					reject(new Error('Failed to load Mermaid script'))
				document.body.appendChild(script)
			})
		}

		// Function to render diagram with retries
		const renderDiagram = async (
			retryCount = 0,
			maxRetries = 5
		): Promise<void> => {
			if (!containerRef.current || !code?.trim()) {
				setError('Diagram kodu bulunamadı veya boş')
				setLoading(false)
				return
			}

			try {
				// Load the mermaid script if not already loaded
				await loadMermaidScript()

				// Clear previous content
				containerRef.current.innerHTML = `<div id="${uniqueId}" class="mermaid">${code}</div>`
				setError(null)

				// Initialize mermaid
				window.mermaid.initialize({
					startOnLoad: true,
					theme: 'default',
					securityLevel: 'loose',
					logLevel: 3,
					fontFamily: 'sans-serif',
				})

				// Force re-initialize mermaid on the element
				await window.mermaid.run({
					querySelector: `#${uniqueId}`,
					nodes: undefined,
				})

				setLoading(false)
				console.log('Mermaid diagram rendered successfully')
			} catch (err) {
				console.error(`Mermaid render error (attempt ${retryCount + 1}):`, err)

				// Retry with exponential backoff
				if (retryCount < maxRetries) {
					const delay = Math.min(1000 * Math.pow(1.5, retryCount), 10000)
					console.log(
						`Retrying in ${delay}ms (attempt ${retryCount + 1}/${maxRetries})`
					)

					setTimeout(() => {
						renderDiagram(retryCount + 1, maxRetries)
					}, delay)
				} else {
					setError(
						`Diagram render edilemedi: ${err instanceof Error ? err.message : 'Bilinmeyen hata'}`
					)
					setLoading(false)

					// Create a retry button
					if (containerRef.current) {
						containerRef.current.innerHTML = `
							<div class="mermaid-error p-4 border border-red-300 rounded bg-red-50 text-red-800">
								<p class="font-bold mb-2">Diagram render edilemedi (${maxRetries + 1} deneme sonrası)</p>
								<pre class="text-xs p-2 bg-gray-100 overflow-auto rounded mb-2">${code}</pre>
								<button id="retry-button-${uniqueId}" class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded">
									Tekrar Dene
								</button>
							</div>
						`

						// Add event listener for the retry button
						const retryButton = document.getElementById(
							`retry-button-${uniqueId}`
						)
						if (retryButton) {
							retryButton.addEventListener('click', () => {
								setLoading(true)
								renderDiagram(0, maxRetries)
							})
						}
					}
				}
			}
		}

		// Initial render
		setLoading(true)
		renderDiagram()

		// Cleanup function
		return () => {
			const retryButton = document.getElementById(`retry-button-${uniqueId}`)
			if (retryButton) {
				retryButton.removeEventListener('click', () => {})
			}
		}
	}, [code, uniqueId])

	return (
		<div className='mermaid-wrapper my-4'>
			{loading && (
				<div className='flex justify-center items-center p-4 border border-gray-200 rounded bg-gray-50'>
					<div className='animate-pulse text-gray-500'>Loading...</div>
				</div>
			)}
			<div
				ref={containerRef}
				className='overflow-auto'
			/>
		</div>
	)
}

// Add TypeScript interface to Window object
declare global {
	interface Window {
		mermaid: {
			initialize: (config: any) => void
			render: (id: string, code: string) => Promise<{ svg: string }>
			parse: (code: string) => Promise<void>
			run: (options: { querySelector: string; nodes?: any }) => Promise<void>
		}
	}
}
