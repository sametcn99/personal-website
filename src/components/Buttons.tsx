'use client'
import { categoryOrder, socialMediaLinks } from '@/lib/social'
import { motion } from 'framer-motion'

export default function Buttons() {
	const container = {
		hidden: { opacity: 1, scale: 0 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	}

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	}

	return (
		<motion.section
			className='flex flex-wrap items-center justify-center gap-4'
			variants={container}
			initial='hidden'
			animate='visible'
		>
			{socialMediaLinks
				.sort((a, b) => {
					const categoryAIndex = categoryOrder[a.category]
					const categoryBIndex = categoryOrder[b.category]

					if (categoryAIndex === categoryBIndex) {
						return a.label.localeCompare(b.label)
					}
					return categoryAIndex - categoryBIndex
				})
				.map(
					(socialMedia, index) =>
						socialMedia.visible && (
							<motion.a
								className='m-1 inline-flex select-none items-center gap-1 rounded-xl p-2 transition-all duration-700 hover:bg-black/30 dark:hover:bg-white/30'
								key={index}
								href={`/${socialMedia.type[0]}`}
								target='_blank'
								rel='noopener noreferrer'
								aria-label={socialMedia.label}
								variants={item}
								onMouseDown={(e) => e.preventDefault()}
							>
								{socialMedia.label}
							</motion.a>
						)
				)}
		</motion.section>
	)
}
