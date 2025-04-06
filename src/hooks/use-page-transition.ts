import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type TransitionOptions = {
	duration?: number
	direction?: 'left' | 'right' | 'top' | 'bottom'
}

export function usePageTransition() {
	const router = useRouter()
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [transitionClass, setTransitionClass] = useState('')

	const navigate = useCallback(
		(href: string, options: TransitionOptions = {}) => {
			const { duration = 500, direction = 'left' } = options

			// Set transition class based on direction
			let enterClass = 'animate-fadeIn'
			if (direction === 'left') enterClass = 'animate-slideInFromRight'
			if (direction === 'right') enterClass = 'animate-slideInFromLeft'
			if (direction === 'top') enterClass = 'animate-slideInFromBottom'
			if (direction === 'bottom') enterClass = 'animate-slideInFromTop'

			setTransitionClass(enterClass)
			setIsTransitioning(true)

			// Navigate after transition
			setTimeout(() => {
				router.push(href)

				// Reset state after navigation
				setTimeout(() => {
					setIsTransitioning(false)
				}, 50)
			}, duration)
		},
		[router]
	)

	// Handle initial page load animation
	useEffect(() => {
		setTransitionClass('animate-fadeIn')

		// Clear animation class after it's done
		const timer = setTimeout(() => {
			setTransitionClass('')
		}, 500)

		return () => clearTimeout(timer)
	}, [])

	return {
		navigate,
		isTransitioning,
		transitionClass,
	}
}
