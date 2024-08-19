import { metadata, viewport } from '@/lib/metadata'
import { cn } from '@/utils/cn'
import { Analytics } from '@vercel/analytics/react'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
export { metadata, viewport }

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body
				className={cn(
					inter.className,
					'antialiased selection:bg-slate-300 selection:text-purple-900 selection:dark:bg-slate-900 selection:dark:text-purple-500'
				)}
			>
				{children}
				<Analytics />
			</body>
		</html>
	)
}
