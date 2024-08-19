import { categoryOrder, socialMediaLinks } from '@/lib/social'

const findDuplicates = (occurrences: Map<string, number>): string[] => {
	return Array.from(occurrences.entries())
		.filter(([, count]) => count > 1)
		.map(([key]) => key)
}

const validateUniqueTypesAndLabels = (
	links: SocialMediaLink[]
): { types: string[]; labels: string[] } => {
	const typeOccurrences = new Map<string, number>()
	const labelOccurrences = new Map<string, number>()

	links.forEach(({ type, label }) => {
		type.forEach((t) =>
			typeOccurrences.set(t, (typeOccurrences.get(t) ?? 0) + 1)
		)
		labelOccurrences.set(label, (labelOccurrences.get(label) ?? 0) + 1)
	})

	return {
		types: findDuplicates(typeOccurrences),
		labels: findDuplicates(labelOccurrences),
	}
}

describe('SocialMediaLinks', () => {
	it('should ensure all social media links have unique types and labels', () => {
		const { types, labels } = validateUniqueTypesAndLabels(socialMediaLinks)
		expect(types).toHaveLength(0)
		expect(labels).toHaveLength(0)
	})
})

describe('categoryOrder', () => {
	it('should have unique numbers', () => {
		const values = Object.values(categoryOrder)
		const uniqueValues = new Set(values)
		expect(uniqueValues.size).toBe(values.length)
	})
})
