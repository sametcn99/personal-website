export const socialMediaLinks: SocialMediaLink[] = [
	{
		type: ['linkedin', 'li'],
		link: new URL('https://www.linkedin.com/in/sametc0'),
		label: 'LinkedIn',
		visible: true,
		category: 'Professional Networks',
	},
	{
		type: ['github', 'gh'],
		link: new URL('https://github.com/sametcn99'),
		label: 'GitHub',
		visible: true,
		category: 'Development Platforms',
	},
	{
		type: ['gists', 'gist', 'ghg', 'ghgist', 'ghgists'],
		link: new URL('https://gist.github.com/sametcn99'),
		label: 'Gists',
		visible: true,
		category: 'Development Platforms',
	},
	{
		type: ['instagram', 'ig'],
		link: new URL('https://instagram.com/sametc.0'),
		label: 'Instagram',
		visible: true,
		category: 'Social Media',
	},
	{
		type: ['statsfm', 'sfm', 'sf'],
		link: new URL('https://stats.fm/sametc001'),
		label: 'Stats.fm',
		visible: true,
		category: 'Social Media',
	},
	{
		type: ['codenest', 'cn'],
		link: new URL(
			'https://codenest.app/user/92addc02-ac45-466b-baf9-6e71f85d88b7'
		),
		label: 'CodeNest',
		visible: true,
		category: 'Development Platforms',
	},
	{
		type: ['leetcode', 'lc'],
		link: new URL('https://leetcode.com/sametcn99'),
		label: 'LeetCode',
		visible: true,
		category: 'Development Platforms',
	},
	{
		type: ['telegram', 'tg'],
		link: new URL('https://t.me/sametc0'),
		label: 'Telegram',
		visible: true,
		category: 'Social Media',
	},
	{
		type: ['discord', 'dc'],
		link: new URL('https://discord.com/users/1120483504535392327'),
		label: 'Discord',
		visible: true,
		category: 'Social Media',
	},
	{
		type: ['whatsapp', 'wa', 'wp'],
		link: new URL('https://wa.me/905303790565'),
		label: 'WhatsApp',
		visible: true,
		category: 'Contact',
	},
	{
		type: ['mail', 'email', 'gmail', 'e-mail'],
		link: new URL('mailto:sametcn99@gmail.com'),
		label: 'Mail',
		visible: true,
		category: 'Contact',
	},
	{
		type: ['gpv', 'githubprofileviewer', 'gitpv'],
		link: new URL(
			'https://github-profile-viewer.azurewebsites.net/p/sametcn99'
		),
		label: 'GPV',
		visible: true,
		category: 'Development Platforms',
	},
	{
		type: ['cv', 'ozgecmis', 'letter', 'resume'],
		link: new URL('https://sametcc.me/cv'),
		label: 'Resume',
		visible: true,
		category: 'Professional Networks',
	},
	{
		type: ['youtube', 'yt', 'ytb', 'ytube', 'ytbchannel', 'ytchannel'],
		link: new URL('https://youtube.com/@sametc001'),
		label: 'YouTube',
		visible: false,
		category: 'Social Media',
	},
	{
		type: ['youtubemusic', 'ytmusic', 'ymusic', 'ytm'],
		link: new URL(
			'https://music.youtube.com/channel/UCgXu7EZ76uMqPW8i4ZCL72Q?si=1aNE6Zya_1t9ACFl'
		),
		label: 'YouTubeMusic',
		visible: false,
		category: 'Social Media',
	},
	{
		type: ['spotify', 'sp'],
		label: 'Spotify',
		visible: true,
		link: new URL('https://open.spotify.com/user/31qg3kutxxwdq5lzydjx6md534cq'),
		category: 'Social Media',
	},
	{
		type: ['1000kitap', '1k'],
		label: '1000Kitap',
		visible: true,
		link: new URL('https://1000kitap.com/sametc001'),
		category: 'Social Media',
	},
	{
		type: ['letterboxd', 'lbxd', 'lb'],
		label: 'Letterboxd',
		visible: true,
		link: new URL('https://letterboxd.com/sametc001'),
		category: 'Social Media',
	},
]

export const categoryOrder: Record<SocialMediaLink['category'], number> = {
	'Professional Networks': 1,
	'Development Platforms': 2,
	Contact: 3,
	'Social Media': 4,
	Other: 5,
}
