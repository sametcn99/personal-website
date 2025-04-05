import { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
	title: 'Samet Can Cıncık',
	description:
		'Web Developer passionate about creating compelling and user-friendly web experiences.',
	keywords:
		'personal website, Next.js, web development, ui design, portfolio, web developer',
	creator: 'sametcn99',
	robots: 'index, follow',
	icons: [
		{
			url: '/favicon.ico',
			href: '/favicon.ico',
			sizes: '300x300',
			type: 'image/ico',
		},
	],
	referrer: 'no-referrer',
	category: 'personal',
	metadataBase: new URL('https://sametcc.me/'),
	publisher: 'Samet Can Cıncık',
	verification: {
		google: 'YSbWeWN_f4RYnaxt__FUvujMbabAMnjmSzaJldja4Nk',
	},
	twitter: {
		card: 'summary',
		site: '@sametcn99',
	},
	openGraph: {
		type: 'website',
		url: 'https://sametcc.me/',
		title: 'Samet Can Cıncık',
		description:
			'Web Developer passionate about creating compelling and user-friendly web experiences.',
		siteName: 'Samet Can Cıncık',
		locale: 'en_US',
		emails: 'sametcn99@gmail.com',
		alternateLocale: 'tr_TR',
	},
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	userScalable: true,
}
