import typographyPlugin from '@tailwindcss/typography'
import defaultTheme from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
	darkMode: 'class',
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					// Add chart colors
					chart: {
						1: 'hsl(var(--chart-1))',
						2: 'hsl(var(--chart-2))',
						3: 'hsl(var(--chart-3))',
						4: 'hsl(var(--chart-4))',
						5: 'hsl(var(--chart-5))',
					},
					// Add sidebar colors
					sidebar: {
						DEFAULT: 'hsl(var(--sidebar))',
						foreground: 'hsl(var(--sidebar-foreground))',
						primary: 'hsl(var(--sidebar-primary))',
						'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
						accent: 'hsl(var(--sidebar-accent))',
						'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
						border: 'hsl(var(--sidebar-border))',
						ring: 'hsl(var(--sidebar-ring))',
					},
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			fontFamily: {
				sans: ['var(--font-sans)', ...defaultTheme.fontFamily.sans],
				mono: ['var(--font-mono)', ...defaultTheme.fontFamily.mono],
				heading: ['var(--font-heading)', ...defaultTheme.fontFamily.sans],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-subtle': 'linear-gradient(to right, var(--subtle-gradient))',
				// Add more gradient patterns
				'gradient-diagonal':
					'linear-gradient(to bottom right, var(--tw-gradient-stops))',
				'gradient-top-down':
					'linear-gradient(to bottom, var(--tw-gradient-stops))',
				'gradient-radial-center':
					'radial-gradient(circle at center, var(--tw-gradient-stops))',
				'gradient-radial-top':
					'radial-gradient(circle at top, var(--tw-gradient-stops))',
				'gradient-radial-bottom':
					'radial-gradient(circle at bottom, var(--tw-gradient-stops))',
				'gradient-mesh':
					'repeating-linear-gradient(45deg, var(--tw-gradient-stops))',
			},
			width: {
				a4: '210mm',
			},
			height: {
				a4: '297mm',
			},
			// Add more screen sizes
			screens: {
				'3xl': '1600px',
				'4xl': '1920px',
				'5xl': '2560px',
				tall: { raw: '(min-height: 800px)' },
				xtall: { raw: '(min-height: 1080px)' },
			},
			// Add blur variants
			blur: {
				xs: '2px',
				'2xl': '40px',
				'3xl': '60px',
				'4xl': '80px',
			},
			// Add aspect ratios
			aspectRatio: {
				'4/3': '4 / 3',
				'3/2': '3 / 2',
				'2/3': '2 / 3',
				'9/16': '9 / 16',
				'1/1': '1 / 1',
				'21/9': '21 / 9',
			},
			// Add text shadows
			textShadow: {
				sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
				DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.1)',
				lg: '0 8px 16px rgba(0, 0, 0, 0.1)',
				glow: '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3)',
				'glow-primary':
					'0 0 5px hsl(var(--primary) / 0.5), 0 0 10px hsl(var(--primary) / 0.3)',
			},
			// Add clip paths
			clipPath: {
				triangle: 'polygon(50% 0%, 0% 100%, 100% 100%)',
				diamond: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
				hexagon:
					'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
				circle: 'circle(50% at 50% 50%)',
				'rounded-edges': 'inset(10% 10% 10% 10% round 20px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				fadeIn: {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				fadeOut: {
					from: { opacity: '1' },
					to: { opacity: '0' },
				},
				slideInFromLeft: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				slideInFromRight: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				slideInFromTop: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				slideInFromBottom: {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
					// Add more animation keyframes
					pulse: {
						'0%, 100%': { opacity: '1' },
						'50%': { opacity: '0.5' },
					},
					bounce: {
						'0%, 100%': { transform: 'translateY(0)' },
						'50%': { transform: 'translateY(-10px)' },
					},
					shake: {
						'0%, 100%': { transform: 'translateX(0)' },
						'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
						'20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				fadeIn: 'fadeIn 0.5s ease-in-out',
				fadeOut: 'fadeOut 0.5s ease-in-out',
				slideInFromLeft: 'slideInFromLeft 0.5s ease-out',
				slideInFromRight: 'slideInFromRight 0.5s ease-out',
				slideInFromTop: 'slideInFromTop 0.5s ease-out',
				slideInFromBottom: 'slideInFromBottom 0.5s ease-out',
				'spin-slow': 'spin-slow 6s linear infinite',
				// Add more animations
				pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				bounce: 'bounce 1s infinite',
				shake: 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
			},
			typography: {
				DEFAULT: {
					css: {
						'code::before': {
							content: '""',
						},
						'code::after': {
							content: '""',
						},
					},
				},
			},
			spacing: {
				'8xl': '96rem',
				'9xl': '128rem',
			},
			zIndex: {
				'60': '60',
				'70': '70',
				'80': '80',
				'90': '90',
				'100': '100',
			},
		},
	},
	plugins: [
		typographyPlugin(),
		plugin(({ addUtilities }: { addUtilities: any }) => {
			addUtilities({
				'.scrollbar-hide': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none',
					'&::-webkit-scrollbar': {
						display: 'none',
					},
				},
				'.scrollbar-thin': {
					'scrollbar-width': 'thin',
					'&::-webkit-scrollbar': {
						width: '5px',
						height: '5px',
					},
				},
			})
		}),
		// Add text shadow plugin
		plugin(({ matchUtilities, theme }: { matchUtilities: any; theme: any }) => {
			matchUtilities(
				{
					'text-shadow': (value: string) => ({
						textShadow: value,
					}),
				},
				{ values: theme('textShadow') }
			)
		}),
		// Add clip path plugin
		plugin(({ matchUtilities, theme }: { matchUtilities: any; theme: any }) => {
			matchUtilities(
				{
					'clip-path': (value: string) => ({
						clipPath: value,
					}),
				},
				{ values: theme('clipPath') }
			)
		}),
	],
}
export default config
