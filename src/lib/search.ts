import lunr from "lunr";
import appData from "./app-data.json";

// Interface for gist data
export interface GistData {
	href: string;
	title: string;
	lastModified: string;
}

// Interface for search results
export interface SearchResult extends GistData {
	score: number; // Search relevance score - remove optional modifier
}

// Create the index
const createIndex = (): lunr.Index => {
	return lunr(function () {
		this.field("title", { boost: 10 });
		this.ref("href");

		appData.forEach((gist) => {
			this.add({
				title: gist.title,
				href: gist.href,
			});
		});
	});
};

// Store index in memory to avoid recreating it on every search
let gistIndex: lunr.Index | null = null;

// Function to get the index (create it if it doesn't exist yet)
const getIndex = (): lunr.Index => {
	if (!gistIndex) {
		gistIndex = createIndex();
	}
	return gistIndex;
};

// Function to search gists
export function searchGists(query: string): SearchResult[] {
	if (!query.trim()) {
		return [];
	}

	try {
		// Get the index
		const index = getIndex();

		// Search the index
		const results = index.search(query);

		// Map the results to the actual gist data and ensure non-null values
		return results
			.map((result) => {
				const gist = appData.find((item) => item.href === result.ref);
				if (!gist) return null;

				return {
					...gist,
					score: result.score,
				};
			})
			.filter((item): item is SearchResult => item !== null)
			.sort((a, b) => b.score - a.score); // score is now guaranteed to be non-null
	} catch (error) {
		console.error("Search error:", error);

		// Fallback to simple title matching if lunr throws an error
		const lowerQuery = query.toLowerCase();
		return appData
			.filter((gist) => gist.title.toLowerCase().includes(lowerQuery))
			.map((gist) => ({ ...gist, score: 1 })); // Provide a default score of 1
	}
}
