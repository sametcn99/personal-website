import lunr from "lunr";
import fs from "fs";
import path from "path";
import { extractMdxContent } from "./mdx-extractor";

/**
 * Build a search index from all gist data and their MDX content
 * and save it to a JSON file for client-side use
 */
export async function buildSearchIndex() {
	try {
		// Extract content from MDX files
		const enhancedData = await extractMdxContent();

		// Create lunr index
		const idx = lunr(function () {
			// Define fields to search
			this.field("title", { boost: 10 }); // Boost title matches
			this.field("content");

			// Add a unique reference for each document
			this.ref("href");

			// Add each gist to the index
			enhancedData.forEach((gist) => {
				this.add({
					href: gist.href,
					title: gist.title,
					content: gist.content || "",
				});
			});
		});

		// Create the result object with index and data
		const searchData = {
			index: idx.toJSON(),
			gists: enhancedData.map(({ href, title, lastModified }) => ({
				href,
				title,
				lastModified,
			})),
		};

		// Save to file
		const outputPath = path.join(process.cwd(), "src/lib/search-index.json");
		fs.writeFileSync(outputPath, JSON.stringify(searchData));

		console.log(`✅ Search index built and saved to ${outputPath}`);
		return searchData;
	} catch (error) {
		console.error("Error building search index:", error);
		throw error;
	}
}

// Run if this file is executed directly
if (require.main === module) {
	buildSearchIndex()
		.then(() => process.exit(0))
		.catch((error) => {
			console.error("Failed to build search index:", error);
			process.exit(1);
		});
}
