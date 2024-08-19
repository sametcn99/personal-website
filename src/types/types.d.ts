type SocialMediaLink = {
	link: URL
	label: string
	type: string[]
	visible: boolean
	category:
		| 'Professional Networks'
		| 'Development Platforms'
		| 'Social Media'
		| 'Contact'
		| 'Other'
}
