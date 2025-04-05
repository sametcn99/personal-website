'use client'

import React, {
	useEffect,
	useRef,
	useState,
	useCallback,
	useMemo,
	memo,
	ErrorInfo,
} from 'react'
import mermaid, { MermaidConfig } from 'mermaid'
import { CopyButton } from './copy-button'
import { v4 as uuidv4 } from 'uuid'
import { cn } from '@/lib/utils'

// Define comprehensive types for better type safety
interface MermaidRendererProps {
	code: string
	id?: string
	maxRetries?: number
	retryDelay?: number
	theme?: 'default' | 'forest' | 'dark' | 'neutral' | 'base'
	className?: string
	errorMessages?: {
		emptyCode?: string
		renderFailed?: string
		retryButton?: string
		loading?: string
	}
	onRenderSuccess?: () => void
	onRenderError?: (error: Error) => void
	enableZoom?: boolean
}

// Add new types for zoom and pan state
interface ZoomPanState {
	scale: number
	translateX: number
	translateY: number
	isDragging: boolean
	startX: number
	startY: number
}

type RenderStatus = 'idle' | 'loading' | 'success' | 'error'

interface MermaidState {
	status: RenderStatus
	error: string | null
	retryCount: number
	svg?: string
}

// Create a separate Error Boundary component with proper typing
class MermaidErrorBoundary extends React.Component<
	{
		children: React.ReactNode
		onError: (error: Error, info: ErrorInfo) => void
	},
	{ hasError: boolean }
> {
	constructor(props: {
		children: React.ReactNode
		onError: (error: Error, info: ErrorInfo) => void
	}) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(): { hasError: boolean } {
		return { hasError: true }
	}

	componentDidCatch(error: Error, info: React.ErrorInfo): void {
		this.props.onError(error, info)
	}

	render(): React.ReactNode {
		if (this.state.hasError) {
			return null // Parent component will handle rendering the error UI
		}
		return this.props.children
	}
}

// Advanced custom hook for Mermaid rendering logic with comprehensive error handling
const useMermaid = (props: MermaidRendererProps) => {
	const {
		code,
		id,
		maxRetries = 5,
		retryDelay = 1000,
		theme = 'default',
		onRenderSuccess,
		onRenderError,
	} = props

	const containerRef = useRef<HTMLDivElement>(null)
	const [state, setState] = useState<MermaidState>({
		status: 'idle',
		error: null,
		retryCount: 0,
	})
	const uniqueId = useMemo(
		() => id || `mermaid-${uuidv4().replace(/-/g, '')}`,
		[id]
	)

	// Comprehensive mermaid configuration with all options
	const mermaidConfig = useMemo(
		(): MermaidConfig => ({
			startOnLoad: true,
			theme,
			securityLevel: 'loose', // Consider 'strict' for production
			logLevel: process.env.NODE_ENV === 'production' ? 1 : 3,
			fontFamily: 'sans-serif',
			altFontFamily: 'sans-serif',
			themeCSS: '',
			deterministicIds: true,
			maxTextSize: 50000,
			er: {
				diagramPadding: 20,
				layoutDirection: 'TB',
				minEntityWidth: 100,
				minEntityHeight: 75,
				entityPadding: 15,
				stroke: 'gray',
				fill: 'honeydew',
				fontSize: 12,
			},
			flowchart: {
				diagramPadding: 8,
				htmlLabels: true,
				curve: 'basis',
				defaultRenderer: 'dagre-wrapper',
			},
			sequence: {
				diagramMarginX: 50,
				diagramMarginY: 10,
				actorMargin: 50,
				width: 150,
				height: 65,
				boxMargin: 10,
				boxTextMargin: 5,
				noteMargin: 10,
				messageMargin: 35,
			},
			gantt: {
				titleTopMargin: 25,
				barHeight: 20,
				barGap: 4,
				topPadding: 50,
				leftPadding: 75,
				gridLineStartPadding: 35,
				fontSize: 11,
				sectionFontSize: 11,
				numberSectionStyles: 4,
			},
		}),
		[theme]
	)

	// Main rendering function with comprehensive error handling
	const renderDiagram = useCallback(
		async (attempt = 0): Promise<void> => {
			// Input validation
			if (!code?.trim()) {
				const errorMsg =
					props.errorMessages?.emptyCode || 'Diagram code is empty or missing'
				setState({ status: 'error', error: errorMsg, retryCount: attempt })
				onRenderError?.(new Error(errorMsg))
				return
			}

			setState((prev) => ({ ...prev, status: 'loading', error: null }))

			try {
				// Container validation
				if (!containerRef.current) {
					throw new Error('Container element not found')
				}

				// Prepare container for rendering
				containerRef.current.innerHTML = `<div id="${uniqueId}" class="mermaid">${code}</div>`

				// Initialize mermaid with our config
				mermaid.initialize(mermaidConfig)

				// Allow DOM to update
				await new Promise((resolve) => setTimeout(resolve, 100))

				// Run mermaid to render the diagram
				await mermaid.run({
					querySelector: `#${uniqueId}`,
					nodes: undefined,
				})

				// Store SVG content for potential export
				const svgElement = containerRef.current.querySelector('svg')

				// Debug: Check if SVG element is found and has dimensions
				if (process.env.NODE_ENV !== 'production') {
					console.log('SVG element found:', !!svgElement)
					if (svgElement) {
						console.log('SVG dimensions:', {
							width: svgElement.getAttribute('width'),
							height: svgElement.getAttribute('height'),
						})
					}
				}

				// Force SVG to be visible and take appropriate space
				if (svgElement) {
					svgElement.style.display = 'block'
					svgElement.style.width = '100%'
					svgElement.setAttribute('width', '100%')

					// Ensure height is set if missing
					if (
						!svgElement.getAttribute('height') ||
						svgElement.getAttribute('height') === '0'
					) {
						// Use a valid height value instead of 'auto' which is invalid for SVG height attribute
						svgElement.style.height = 'auto' // Set via style which accepts 'auto'
						svgElement.setAttribute('height', '100%') // Set attribute with valid value
					}
				}

				const svgContent = svgElement ? svgElement.outerHTML : undefined

				// Update state on successful render
				setState({
					status: 'success',
					error: null,
					retryCount: attempt,
					svg: svgContent,
				})

				// Call success callback
				onRenderSuccess?.()

				if (process.env.NODE_ENV !== 'production') {
					console.log('Mermaid diagram rendered successfully')
				}
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'Unknown error'

				if (process.env.NODE_ENV !== 'production') {
					console.error(
						`Mermaid render error (attempt ${attempt + 1}):`,
						errorMessage
					)
				}

				// Call error callback
				if (err instanceof Error) {
					onRenderError?.(err)
				} else {
					onRenderError?.(new Error(errorMessage))
				}

				// Implement retry logic with exponential backoff
				if (attempt < maxRetries) {
					const nextDelay = Math.min(retryDelay * Math.pow(1.5, attempt), 10000)

					if (process.env.NODE_ENV !== 'production') {
						console.log(
							`Retrying in ${nextDelay}ms (attempt ${attempt + 1}/${maxRetries})`
						)
					}

					// Schedule retry
					setTimeout(() => {
						renderDiagram(attempt + 1)
					}, nextDelay)
				} else {
					// Update state with error info after max retries
					const errorMsg =
						props.errorMessages?.renderFailed ||
						`Failed to render diagram after ${maxRetries + 1} attempts: ${errorMessage}`

					setState({
						status: 'error',
						error: errorMsg,
						retryCount: attempt,
					})
				}
			}
		},
		[
			code,
			uniqueId,
			mermaidConfig,
			maxRetries,
			retryDelay,
			props.errorMessages,
			onRenderSuccess,
			onRenderError,
		]
	)

	// Effect to render diagram when inputs change
	useEffect(() => {
		setState((prev) => ({ ...prev, status: 'loading' }))

		// Debounce rendering to prevent rapid re-renders during typing
		const timeoutId = setTimeout(() => {
			renderDiagram(0)
		}, 150)

		// Cleanup function
		return () => {
			clearTimeout(timeoutId)
		}
	}, [code, renderDiagram])

	// Handle React error boundary errors
	const handleError = useCallback(
		(error: Error, info: ErrorInfo) => {
			setState({
				status: 'error',
				error: `React rendering error: ${error.message}`,
				retryCount: state.retryCount,
			})

			// Call error callback
			onRenderError?.(error)

			if (process.env.NODE_ENV !== 'production') {
				console.error('React error in Mermaid component:', error, info)
			}
		},
		[state.retryCount, onRenderError]
	)

	return {
		containerRef,
		state,
		uniqueId,
		renderDiagram,
		handleError,
	}
}

// UI Components for different states (memoized for performance)
const LoadingState = memo(
	({ message = 'Loading diagram...' }: { message?: string }) => (
		<div
			className='flex justify-center items-center p-4 border border-gray-200 rounded bg-gray-50'
			role='status'
			aria-live='polite'
		>
			<div className='animate-pulse text-gray-500'>{message}</div>
		</div>
	)
)

LoadingState.displayName = 'MermaidLoadingState'

const ErrorState = memo(
	({
		error,
		code,
		onRetry,
		retryButtonText = 'Retry',
	}: {
		error: string
		code: string
		onRetry: () => void
		retryButtonText?: string
	}) => (
		<div
			className='mermaid-error p-4 border border-red-300 rounded bg-red-50 text-red-800'
			role='alert'
			aria-live='assertive'
		>
			<p className='font-bold mb-2'>Diagram rendering failed</p>
			<p className='text-sm mb-2'>{error}</p>
			<pre className='text-xs p-2 bg-gray-100 overflow-auto rounded mb-2 whitespace-pre-wrap'>
				{code}
			</pre>
			<button
				onClick={onRetry}
				className='px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-sm transition-colors duration-200 font-medium text-sm'
				aria-label={retryButtonText}
			>
				{retryButtonText}
			</button>
		</div>
	)
)

ErrorState.displayName = 'MermaidErrorState'

// Zoom and Pan Controls Component
const ZoomControls = memo(
	({
		onZoomIn,
		onZoomOut,
		onReset,
		scale,
	}: {
		onZoomIn: () => void
		onZoomOut: () => void
		onReset: () => void
		scale: number
	}) => (
		<div className='flex items-center gap-2 absolute top-2 right-2 bg-gray-800 dark:bg-gray-900 p-1.5 rounded-lg shadow-md z-10'>
			<button
				onClick={onZoomOut}
				className='p-1.5 rounded-lg text-gray-200 hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors duration-200'
				title='Zoom out'
				type='button'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<circle
						cx='11'
						cy='11'
						r='8'
					/>
					<line
						x1='21'
						y1='21'
						x2='16.65'
						y2='16.65'
					/>
					<line
						x1='8'
						y1='11'
						x2='14'
						y2='11'
					/>
				</svg>
			</button>
			<span className='text-xs text-gray-200 dark:text-gray-300 font-medium'>
				{Math.round(scale * 100)}%
			</span>
			<button
				onClick={onZoomIn}
				className='p-1.5 rounded-lg text-gray-200 hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors duration-200'
				title='Zoom in'
				type='button'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<circle
						cx='11'
						cy='11'
						r='8'
					/>
					<line
						x1='21'
						y1='21'
						x2='16.65'
						y2='16.65'
					/>
					<line
						x1='11'
						y1='8'
						x2='11'
						y2='14'
					/>
					<line
						x1='8'
						y1='11'
						x2='14'
						y2='11'
					/>
				</svg>
			</button>
			<button
				onClick={onReset}
				className='p-1.5 rounded-lg text-gray-200 hover:bg-gray-700 dark:hover:bg-gray-800 transition-colors duration-200'
				title='Reset view'
				type='button'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'
				>
					<path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' />
					<path d='M3 3v5h5' />
				</svg>
			</button>
		</div>
	)
)

ZoomControls.displayName = 'ZoomControls'

// Main component (memoized for performance)
const Mermaid = memo(
	({
		code,
		id,
		maxRetries = 5,
		retryDelay = 1000,
		theme = 'default',
		className,
		errorMessages = {
			emptyCode: 'Diagram code is empty or missing',
			renderFailed: 'Failed to render diagram',
			retryButton: 'Retry',
			loading: 'Loading diagram...',
		},
		onRenderSuccess,
		onRenderError,
		enableZoom = true,
	}: MermaidRendererProps) => {
		const { containerRef, state, renderDiagram, handleError } = useMermaid({
			code,
			id,
			maxRetries,
			retryDelay,
			theme,
			errorMessages,
			onRenderSuccess,
			onRenderError,
		})

		// Add state for zoom and pan
		const [zoomPan, setZoomPan] = useState<ZoomPanState>({
			scale: 1,
			translateX: 0,
			translateY: 0,
			isDragging: false,
			startX: 0,
			startY: 0,
		})

		const svgRef = useRef<SVGSVGElement | null>(null)
		const wrapperRef = useRef<HTMLDivElement | null>(null)

		// Update svgRef when diagram is rendered
		useEffect(() => {
			if (state.status === 'success' && containerRef.current) {
				svgRef.current = containerRef.current.querySelector('svg')
			}
		}, [state.status])

		const handleRetry = useCallback(() => {
			renderDiagram(0)
		}, [renderDiagram])

		// Zoom handlers
		const handleZoomIn = useCallback(() => {
			setZoomPan((prev) => ({
				...prev,
				scale: Math.min(prev.scale * 1.2, 3),
			}))
		}, [])

		const handleZoomOut = useCallback(() => {
			setZoomPan((prev) => ({
				...prev,
				scale: Math.max(prev.scale / 1.2, 0.5),
			}))
		}, [])

		const handleReset = useCallback(() => {
			setZoomPan({
				scale: 1,
				translateX: 0,
				translateY: 0,
				isDragging: false,
				startX: 0,
				startY: 0,
			})
		}, [])

		// Mouse and touch event handlers for panning
		const handleMouseDown = useCallback(
			(e: React.MouseEvent) => {
				if (!enableZoom) return
				setZoomPan((prev) => ({
					...prev,
					isDragging: true,
					startX: e.clientX - prev.translateX,
					startY: e.clientY - prev.translateY,
				}))
			},
			[enableZoom]
		)

		const handleMouseMove = useCallback(
			(e: MouseEvent) => {
				if (!enableZoom) return
				setZoomPan((prev) => {
					if (!prev.isDragging) return prev
					return {
						...prev,
						translateX: e.clientX - prev.startX,
						translateY: e.clientY - prev.startY,
					}
				})
			},
			[enableZoom]
		)

		const handleMouseUp = useCallback(() => {
			if (!enableZoom) return
			setZoomPan((prev) => ({ ...prev, isDragging: false }))
		}, [enableZoom])

		// Handle wheel event for zooming
		const handleWheel = useCallback(
			(e: WheelEvent) => {
				if (!enableZoom) return
				e.preventDefault()

				const delta = e.deltaY > 0 ? 0.9 : 1.1

				setZoomPan((prev) => {
					const newScale = Math.max(0.5, Math.min(3, prev.scale * delta))
					return {
						...prev,
						scale: newScale,
					}
				})
			},
			[enableZoom]
		)

		// Set up event listeners
		useEffect(() => {
			if (!enableZoom) return

			const wrapper = wrapperRef.current
			if (!wrapper) return

			// For dragging
			document.addEventListener('mousemove', handleMouseMove)
			document.addEventListener('mouseup', handleMouseUp)

			// For wheel zooming
			wrapper.addEventListener('wheel', handleWheel, { passive: false })

			return () => {
				document.removeEventListener('mousemove', handleMouseMove)
				document.removeEventListener('mouseup', handleMouseUp)
				wrapper?.removeEventListener('wheel', handleWheel)
			}
		}, [handleMouseMove, handleMouseUp, handleWheel, enableZoom])

		// Apply the transformation to the SVG
		useEffect(() => {
			if (state.status === 'success' && svgRef.current && enableZoom) {
				const svg = svgRef.current
				svg.style.transform = `translate(${zoomPan.translateX}px, ${zoomPan.translateY}px) scale(${zoomPan.scale})`
				svg.style.transformOrigin = 'center'
				svg.style.transition = zoomPan.isDragging
					? 'none'
					: 'transform 0.2s ease-out'
			}
		}, [zoomPan, state.status, enableZoom])

		return (
			<div className={cn('mermaid-wrapper my-4 relative', className)}>
				<MermaidErrorBoundary onError={handleError}>
					{state.status === 'loading' && (
						<LoadingState message={errorMessages.loading} />
					)}

					{state.status === 'error' && (
						<ErrorState
							error={state.error || ''}
							code={code}
							onRetry={handleRetry}
							retryButtonText={errorMessages.retryButton}
						/>
					)}

					{state.status === 'success' && enableZoom && (
						<>
							<div className='absolute top-2 left-2 z-10'>
								<CopyButton text={code} />
							</div>
							<ZoomControls
								onZoomIn={handleZoomIn}
								onZoomOut={handleZoomOut}
								onReset={handleReset}
								scale={zoomPan.scale}
							/>
						</>
					)}

					<div
						ref={wrapperRef}
						className={cn(
							'overflow-hidden',
							enableZoom && state.status === 'success' ? 'cursor-grab' : '',
							zoomPan.isDragging ? 'cursor-grabbing' : ''
						)}
						style={{
							minHeight: '50px',
							display: 'block',
							width: '100%',
							position: 'relative',
						}}
						onMouseDown={handleMouseDown}
					>
						<div
							ref={containerRef}
							className='overflow-visible'
							style={{
								minHeight: '50px',
								display: 'block',
								width: '100%',
							}}
							aria-hidden={state.status !== 'success'}
							data-testid='mermaid-container'
						/>
					</div>
				</MermaidErrorBoundary>
			</div>
		)
	}
)

// Set display name for better debugging
Mermaid.displayName = 'Mermaid'

export default Mermaid
