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
			<body className={cn(inter.className, 'antialiased')}>
				{children}
				<Analytics />
			</body>
		</html>
	)
}
