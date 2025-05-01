import fs from 'fs';
import path from 'path';
import appData from './app-data.json';

/**
 * Extract content from MDX files for search indexing
 * 
 * This function reads the content of MDX files for each gist
 * and returns an enhanced array with the content for search indexing
 */
export async function extractMdxContent() {
  // Base directory for gist MDX files
  const gistsBaseDir = path.join(process.cwd(), 'src/app/gist');
  
  // Enhanced data with content
  const enhancedData = await Promise.all(
    appData.map(async (item) => {
      try {
        // Extract the gist slug from the href
        const slug = item.href.split('/').pop();
        if (!slug) return { ...item, content: '' };
        
        // Path to the MDX file
        const filePath = path.join(gistsBaseDir, slug, 'page.mdx');
        
        // Check if the file exists
        if (fs.existsSync(filePath)) {
          // Read file content
          const content = fs.readFileSync(filePath, 'utf-8');
          return {
            ...item,
            content: content
              .replace(/```[\s\S]*?```/g, '') // Remove code blocks
              .replace(/import.*?;/g, '') // Remove import statements
              .replace(/<.*?>/g, '') // Remove HTML tags
              .replace(/\s+/g, ' ') // Normalize whitespace
              .trim()
          };
        }
        
        // Return item without content if file doesn't exist
        return { ...item, content: '' };
      } catch (error) {
        console.error(`Error processing ${item.title}:`, error);
        return { ...item, content: '' };
      }
    })
  );
  
  return enhancedData;
}

// Interface for enhanced gist data with content
export interface EnhancedGistData {
  title: string;
  href: string;
  lastModified: string;
  content: string;
}
