import type { Config } from 'tailwindcss'
import typographyPlugin from '@tailwindcss/typography'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			width: {
				a4: '210mm',
			},
			height: {
				a4: '297mm',
			},
		},
	},
	plugins: [typographyPlugin()],
}
export default config
