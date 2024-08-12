import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Samet Can Cıncık',
		short_name: 'sametcc',
		dir: 'auto',
		description:
			'Web Developer passionate about creating compelling and user-friendly web experiences.',
		categories: ['personal', 'portfolio'],
		theme_color: '#000000',
		background_color: '#000000',
		display: 'standalone',
		scope: '/',
		lang: 'en_US',
		start_url: '/',
		orientation: 'portrait',
		icons: [
			{
				src: '/favicon.ico',
				sizes: '300x300',
				type: 'image/ico',
				purpose: 'any',
			},
		],
	}
}
