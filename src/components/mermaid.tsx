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
import {
	CircularProgress,
	Typography,
	Button,
	Box,
	IconButton,
	Tooltip,
} from '@mui/material'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import RefreshIcon from '@mui/icons-material/Refresh'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import mermaid, { MermaidConfig } from 'mermaid'
import CopyButton from './CopyButton'
import { v4 as uuidv4 } from 'uuid'

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
		<Box
			display='flex'
			justifyContent='center'
			alignItems='center'
			padding={6}
			border='1px solid'
			borderColor='grey.800'
			borderRadius='8px'
			bgcolor='grey.900'
			color='white'
			overflow='hidden'
			boxShadow={3}
			role='status'
			aria-live='polite'
		>
			<Box
				display='flex'
				flexDirection='column'
				alignItems='center'
				gap={3}
			>
				<CircularProgress
					size={24}
					color='inherit'
				/>
				<Typography
					variant='subtitle1'
					color='grey.300'
				>
					{message}
				</Typography>
			</Box>
		</Box>
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
		<Box
			padding={4}
			border='1px solid'
			borderColor='red.300'
			borderRadius='4px'
			bgcolor='red.50'
			color='red.800'
			role='alert'
			aria-live='assertive'
		>
			<Typography
				variant='h6'
				fontWeight='bold'
				mb={2}
			>
				Diagram rendering failed
			</Typography>
			<Typography
				variant='body2'
				mb={2}
			>
				{error}
			</Typography>
			<pre
				style={{
					fontSize: '12px',
					padding: '8px',
					backgroundColor: '#f5f5f5',
					overflow: 'auto',
					borderRadius: '4px',
					whiteSpace: 'pre-wrap',
				}}
			>
				{code}
			</pre>
			<Button
				onClick={onRetry}
				variant='contained'
				color='primary'
				aria-label={retryButtonText}
			>
				{retryButtonText}
			</Button>
		</Box>
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
		<Box
			display='flex'
			alignItems='center'
			gap={1}
			position='absolute'
			top={2}
			right={2}
			bgcolor='rgba(0, 0, 0, 0.7)'
			padding={0.5}
			borderRadius={1}
			boxShadow={3}
			zIndex={10}
		>
			<Tooltip
				title='Zoom out'
				placement='top'
				arrow
			>
				<IconButton
					color='inherit'
					onClick={onZoomOut}
					aria-label='zoom out'
				>
					<ZoomOutIcon />
				</IconButton>
			</Tooltip>
			<Typography
				variant='caption'
				color='white'
			>
				{Math.round(scale * 100)}%
			</Typography>
			<Tooltip
				title='Zoom in'
				placement='top'
				arrow
			>
				<IconButton
					color='inherit'
					onClick={onZoomIn}
					aria-label='zoom in'
				>
					<ZoomInIcon />
				</IconButton>
			</Tooltip>
			<Tooltip
				title='Reset view'
				placement='top'
				arrow
			>
				<IconButton
					color='inherit'
					onClick={onReset}
					aria-label='reset view'
				>
					<RefreshIcon />
				</IconButton>
			</Tooltip>
		</Box>
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
		const { containerRef, state, uniqueId, renderDiagram, handleError } =
			useMermaid({
				code,
				id,
				maxRetries,
				retryDelay,
				theme,
				onRenderSuccess,
				onRenderError,
				errorMessages,
			})

		const [zoomPanState, setZoomPanState] = useState<ZoomPanState>({
			scale: 1,
			translateX: 0,
			translateY: 0,
			isDragging: false,
			startX: 0,
			startY: 0,
		})

		const zoomStep = 0.2
		const minZoom = 0.2
		const maxZoom = 2

		const onZoomIn = useCallback(() => {
			setZoomPanState((prevState) => ({
				...prevState,
				scale: Math.min(prevState.scale + zoomStep, maxZoom),
			}))
		}, [zoomStep, maxZoom])

		const onZoomOut = useCallback(() => {
			setZoomPanState((prevState) => ({
				...prevState,
				scale: Math.max(prevState.scale - zoomStep, minZoom),
			}))
		}, [zoomStep, minZoom])

		const onReset = useCallback(() => {
			setZoomPanState({
				scale: 1,
				translateX: 0,
				translateY: 0,
				isDragging: false,
				startX: 0,
				startY: 0,
			})
		}, [])

		const handleMouseDown = useCallback((event: React.MouseEvent) => {
			setZoomPanState((prevState) => ({
				...prevState,
				isDragging: true,
				startX: event.clientX - prevState.translateX,
				startY: event.clientY - prevState.translateY,
			}))
		}, [])

		const handleMouseMove = useCallback(
			(event: React.MouseEvent) => {
				if (!zoomPanState.isDragging) return
				setZoomPanState((prevState) => ({
					...prevState,
					translateX: event.clientX - prevState.startX,
					translateY: event.clientY - prevState.startY,
				}))
			},
			[zoomPanState.isDragging]
		)

		const handleMouseUp = useCallback(() => {
			setZoomPanState((prevState) => ({
				...prevState,
				isDragging: false,
			}))
		}, [])

		const handleMouseLeave = useCallback(() => {
			setZoomPanState((prevState) => ({
				...prevState,
				isDragging: false,
			}))
		}, [])

		const diagramStyle = useMemo(
			() => ({
				transform: `translate(${zoomPanState.translateX}px, ${zoomPanState.translateY}px) scale(${zoomPanState.scale})`,
				transformOrigin: '0 0',
				transition: 'transform 0.3s ease-out',
				width: '100%',
				height: '100%',
				display: 'block',
			}),
			[zoomPanState.scale, zoomPanState.translateX, zoomPanState.translateY]
		)

		const getStatusComponent = () => {
			switch (state.status) {
				case 'loading':
					return (
						<LoadingState
							message={errorMessages?.loading || 'Loading diagram...'}
						/>
					)
				case 'error':
					return (
						<ErrorState
							error={
								state.error || errorMessages?.renderFailed || 'Render failed'
							}
							code={code}
							onRetry={renderDiagram}
							retryButtonText={errorMessages?.retryButton || 'Retry'}
						/>
					)
				case 'success':
					return null // Diagram is rendered directly
				default:
					return null
			}
		}

		const svgElement = containerRef.current?.querySelector('svg')

		return (
			<Box
				className={className}
				position='relative'
				width='100%'
				height='100%'
				overflow='hidden'
				bgcolor='grey.50'
				borderRadius={1}
				boxShadow={2}
			>
				{enableZoom && state.status === 'success' && (
					<ZoomControls
						onZoomIn={onZoomIn}
						onZoomOut={onZoomOut}
						onReset={onReset}
						scale={zoomPanState.scale}
					/>
				)}

				<Box
					ref={containerRef}
					className='mermaid'
					style={{
						width: '100%',
						height: '100%',
						overflow: 'auto',
						cursor: enableZoom ? 'grab' : 'default',
					}}
					onMouseDown={enableZoom ? handleMouseDown : undefined}
					onMouseMove={enableZoom ? handleMouseMove : undefined}
					onMouseUp={enableZoom ? handleMouseUp : undefined}
					onMouseLeave={enableZoom ? handleMouseLeave : undefined}
				>
					{state.status === 'success' && state.svg ? (
						<div
							style={diagramStyle}
							dangerouslySetInnerHTML={{ __html: state.svg }}
						/>
					) : (
						getStatusComponent()
					)}
				</Box>
				<CopyButton text={code} />
			</Box>
		)
	}
)

Mermaid.displayName = 'Mermaid'

export default Mermaid
