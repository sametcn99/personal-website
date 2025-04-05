'use client'

import {
	ZoomIn,
	ZoomOut,
	Maximize,
	Minimize,
	RotateCcw,
	ArrowUp,
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	Copy,
	AlertCircle,
	X,
} from 'lucide-react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import mermaid from 'mermaid'

interface MermaidRendererProps {
	code: string
	className?: string
}

export function Mermaid({ code, className }: MermaidRendererProps) {
	const [error, setError] = useState<string | null>(null)
	const [isRendered, setIsRendered] = useState(false)
	const [showErrorDetails, setShowErrorDetails] = useState(false)
	const [isFullscreen, setIsFullscreen] = useState(false)
	const [scale, setScale] = useState(1)
	const [translateX, setTranslateX] = useState(0)
	const [translateY, setTranslateY] = useState(0)
	const [isPanning, setIsPanning] = useState(false)
	const diagramRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const id = `mermaid-${Math.random().toString(36).slice(2)}`

	const initializeMermaid = useCallback(async () => {
		try {
			mermaid.initialize({
				theme: 'dark',
				securityLevel: 'loose',
				startOnLoad: false,
				flowchart: {
					useMaxWidth: false,
					htmlLabels: true,
				},
				themeVariables: {
					primaryColor: '#1e1e1e',
					primaryTextColor: '#ffffff',
					primaryBorderColor: '#444444',
					lineColor: '#666666',
					secondaryColor: '#252525',
					tertiaryColor: '#111111',
					background: '#0a0a0a',
					mainBkg: '#1a1a1a',
					nodeBorder: '#444444',
					clusterBkg: '#222222',
					clusterBorder: '#444444',
					titleColor: '#ffffff',
					edgeLabelBackground: '#333333',
					textColor: '#cccccc',
				},
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
	}, [id])

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
			setTranslateX((prev) => prev - e.deltaX / scale)
			setTranslateY((prev) => prev - e.deltaY / scale)
		}
	}

	const handleMouseDown = (e: React.MouseEvent) => {
		setIsPanning(true)
	}

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isPanning) return
		setTranslateX((prev) => prev + e.movementX / scale)
		setTranslateY((prev) => prev + e.movementY / scale)
	}

	const handleMouseUp = () => {
		setIsPanning(false)
	}

	const handleTouchStart = (e: React.TouchEvent) => {
		if (e.touches.length === 1) {
			setIsPanning(true)
		}
	}

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isPanning || e.touches.length !== 1) return

		const touch = e.touches[0]
		const node = e.target as HTMLElement
		const rect = node.getBoundingClientRect()

		const offsetX = touch.clientX - rect.left
		const offsetY = touch.clientY - rect.top

		setTranslateX((prev) => prev + offsetX / scale)
		setTranslateY((prev) => prev + offsetY / scale)
	}

	const handleTouchEnd = () => {
		setIsPanning(false)
	}

	const zoomIn = () => setScale((prev) => Math.min(prev * 1.2, 10))
	const zoomOut = () => setScale((prev) => Math.max(prev / 1.2, 0.2))

	const moveUp = () => setTranslateY((prev) => prev + 50 / scale)
	const moveDown = () => setTranslateY((prev) => prev - 50 / scale)
	const moveLeft = () => setTranslateX((prev) => prev + 50 / scale)
	const moveRight = () => setTranslateX((prev) => prev - 50 / scale)

	const reset = () => {
		setScale(1)
		setTranslateX(0)
		setTranslateY(0)
	}

	const toggleFullscreen = () => {
		if (!containerRef.current) return

		if (!isFullscreen) {
			if (containerRef.current.requestFullscreen) {
				containerRef.current.requestFullscreen()
			}
			setIsFullscreen(true)
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen()
			}
			setIsFullscreen(false)
		}
	}

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement)
		}

		document.addEventListener('fullscreenchange', handleFullscreenChange)
		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange)
		}
	}, [])

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(code)
			.then(() => {})
			.catch((err) => {
				console.error('Failed to copy: ', err)
				alert({
					title: 'Failed to copy',
					description: 'Could not copy diagram code to clipboard',
					variant: 'destructive',
					duration: 2000,
				})
			})
	}

	return (
		<div
			ref={containerRef}
			className={cn(
				'relative group rounded-lg border border-zinc-800 bg-black text-white',
				isFullscreen ? 'fixed inset-0 z-50' : 'w-full',
				className
			)}
		>
			{error ? (
				<div className='p-4 rounded-lg border border-red-900 bg-red-950/30'>
					<div className='flex items-center gap-2 text-red-400'>
						<AlertCircle className='h-4 w-4' />
						<span>Failed to render diagram</span>
						<Button
							variant='ghost'
							size='sm'
							onClick={() => setShowErrorDetails(!showErrorDetails)}
							className='text-sm underline ml-2 h-auto p-0 text-red-400 hover:text-red-300 hover:bg-transparent'
						>
							{showErrorDetails ? 'Hide Details' : 'Show Details'}
						</Button>
					</div>
					{showErrorDetails && (
						<pre className='mt-2 p-2 text-sm bg-red-950/50 rounded overflow-auto max-h-[200px] text-red-300'>
							{error}
						</pre>
					)}
				</div>
			) : (
				<>
					<div
						className='overflow-hidden h-full'
						onWheel={handleWheel}
						onMouseDown={handleMouseDown}
						onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseUp}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
						ref={diagramRef}
					>
						<div
							id={id}
							className={cn(
								'mermaid opacity-0 transition-opacity duration-200 origin-center',
								isRendered && 'opacity-100'
							)}
							style={{
								transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
								cursor: isPanning ? 'grabbing' : 'grab',
								transformOrigin: 'center center',
							}}
						>
							{code}
						</div>
					</div>

					{/* Mobile controls - bottom toolbar */}
					<div className='md:hidden fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-2 flex justify-between items-center z-50'>
						<div className='flex items-center gap-2'>
							<Button
								variant='outline'
								size='icon'
								onClick={zoomIn}
								title='Zoom in'
								className='border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
							>
								<ZoomIn className='h-4 w-4' />
							</Button>
							<Button
								variant='outline'
								size='icon'
								onClick={zoomOut}
								title='Zoom out'
								className='border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
							>
								<ZoomOut className='h-4 w-4' />
							</Button>
							<Button
								variant='outline'
								size='icon'
								onClick={reset}
								title='Reset view'
								className='border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
							>
								<RotateCcw className='h-4 w-4' />
							</Button>
						</div>

						<div className='flex items-center gap-2'>
							<Button
								variant='outline'
								size='icon'
								onClick={moveUp}
								title='Move up'
								className='border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
							>
								<ArrowUp className='h-4 w-4' />
							</Button>
							<Button
								variant='outline'
								size='icon'
								onClick={moveDown}
								title='Move down'
								className='border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
							>
								<ArrowDown className='h-4 w-4' />
							</Button>
							<Button
								variant='outline'
								size='icon'
								onClick={moveLeft}
								title='Move left'
								className='border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
							>
								<ArrowLeft className='h-4 w-4' />
							</Button>
							<Button
								variant='outline'
								size='icon'
								onClick={moveRight}
								title='Move right'
								className='border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
							>
								<ArrowRight className='h-4 w-4' />
							</Button>
						</div>

						<div className='flex items-center gap-2'>
							<Button
								variant='outline'
								size='icon'
								onClick={toggleFullscreen}
								title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
								className='border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
							>
								{isFullscreen ? (
									<Minimize className='h-4 w-4' />
								) : (
									<Maximize className='h-4 w-4' />
								)}
							</Button>
							<Button
								variant='outline'
								size='icon'
								onClick={copyToClipboard}
								title='Copy code'
								className='border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
							>
								<Copy className='h-4 w-4' />
							</Button>
						</div>
					</div>

					{/* Desktop controls - floating toolbar */}
					<div className='hidden md:flex absolute top-2 right-2 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 bg-zinc-900/90 backdrop-blur-sm rounded-lg p-1 shadow-md'>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
										onClick={zoomIn}
										className='h-8 w-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
									>
										<ZoomIn className='h-4 w-4' />
									</Button>
								</TooltipTrigger>
								<TooltipContent className='bg-zinc-900 text-zinc-200 border-zinc-800'>
									Zoom in
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
										onClick={zoomOut}
										className='h-8 w-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
									>
										<ZoomOut className='h-4 w-4' />
									</Button>
								</TooltipTrigger>
								<TooltipContent className='bg-zinc-900 text-zinc-200 border-zinc-800'>
									Zoom out
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
										onClick={reset}
										className='h-8 w-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
									>
										<RotateCcw className='h-4 w-4' />
									</Button>
								</TooltipTrigger>
								<TooltipContent className='bg-zinc-900 text-zinc-200 border-zinc-800'>
									Reset view
								</TooltipContent>
							</Tooltip>

							<div className='w-px h-6 bg-zinc-700 mx-1' />

							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
										onClick={moveUp}
										className='h-8 w-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
									>
										<ArrowUp className='h-4 w-4' />
									</Button>
								</TooltipTrigger>
								<TooltipContent className='bg-zinc-900 text-zinc-200 border-zinc-800'>
									Move up
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
										onClick={moveDown}
										className='h-8 w-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
									>
										<ArrowDown className='h-4 w-4' />
									</Button>
								</TooltipTrigger>
								<TooltipContent className='bg-zinc-900 text-zinc-200 border-zinc-800'>
									Move down
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
										onClick={moveLeft}
										className='h-8 w-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
									>
										<ArrowLeft className='h-4 w-4' />
									</Button>
								</TooltipTrigger>
								<TooltipContent className='bg-zinc-900 text-zinc-200 border-zinc-800'>
									Move left
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
										onClick={moveRight}
										className='h-8 w-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
									>
										<ArrowRight className='h-4 w-4' />
									</Button>
								</TooltipTrigger>
								<TooltipContent className='bg-zinc-900 text-zinc-200 border-zinc-800'>
									Move right
								</TooltipContent>
							</Tooltip>

							<div className='w-px h-6 bg-zinc-700 mx-1' />

							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
										onClick={toggleFullscreen}
										className='h-8 w-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
									>
										{isFullscreen ? (
											<Minimize className='h-4 w-4' />
										) : (
											<Maximize className='h-4 w-4' />
										)}
									</Button>
								</TooltipTrigger>
								<TooltipContent className='bg-zinc-900 text-zinc-200 border-zinc-800'>
									{isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
								</TooltipContent>
							</Tooltip>

							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='ghost'
										size='icon'
										onClick={copyToClipboard}
										className='h-8 w-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
									>
										<Copy className='h-4 w-4' />
									</Button>
								</TooltipTrigger>
								<TooltipContent className='bg-zinc-900 text-zinc-200 border-zinc-800'>
									Copy code
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>

					{/* Fullscreen close button */}
					{isFullscreen && (
						<Button
							variant='outline'
							size='icon'
							className='absolute top-2 left-2 z-50 border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
							onClick={toggleFullscreen}
						>
							<X className='h-4 w-4' />
						</Button>
					)}
				</>
			)}
		</div>
	)
}
