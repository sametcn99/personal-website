export default async function sitemap(): Promise<any> {
	return [
		{
			url: 'https://www.sametcc.me/',
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 1,
		},
	]
}
