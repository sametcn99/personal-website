import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'

export function ThemeSwitcher() {
	const { setTheme, theme } = useTheme()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='h-9 w-9 rounded-full'
				>
					<Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
					<Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
					<span className='sr-only'>Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem
					onClick={() => setTheme('light')}
					className='cursor-pointer'
				>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme('dark')}
					className='cursor-pointer'
				>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme('system')}
					className='cursor-pointer'
				>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
