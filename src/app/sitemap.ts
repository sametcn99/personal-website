export default async function sitemap(): Promise<any> {
	return [
		{
			url: 'https://sametcc.me/',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
	]
}
