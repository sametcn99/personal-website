import fs from "fs";
import path from "path";

// Extended metadata type that supports both blog and gist content
export type ContentMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  author?: string;
  tags?: string[];
};

export type ContentType = "blog" | "gist";

export interface ContentItem {
  metadata: ContentMetadata;
  slug: string;
  content: string;
}

/**
 * Parse frontmatter from MDX content
 */
function parseFrontmatter(
  fileContent: string,
  contentType: ContentType = "blog"
): { metadata: ContentMetadata; content: string } {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    // If no frontmatter, extract title from first heading and generate metadata
    const titleMatch = fileContent.match(/^#\s+(.+)$/m);
    const title = titleMatch 
      ? titleMatch[1] 
      : contentType === "gist" ? "Untitled Gist" : "Untitled Post";
    const currentDate = new Date().toISOString().split("T")[0];
    const summaryText = contentType === "gist" 
      ? "A helpful gist" 
      : "A blog post";

    return {
      metadata: {
        title,
        publishedAt: currentDate,
        summary: `${title} - ${summaryText}`,
      } as ContentMetadata,
      content: fileContent,
    };
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<ContentMetadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    
    const trimmedKey = key.trim();
    
    // Handle arrays (like tags)
    if (trimmedKey === "tags" && value.startsWith("[") && value.endsWith("]")) {
      const tagsString = value.slice(1, -1);
      (metadata as Record<string, string | string[]>)[trimmedKey] = tagsString
        .split(",")
        .map((tag) => tag.trim().replace(/^['"](.*)['"]$/, "$1"));
    } else {
      (metadata as Record<string, string | string[]>)[trimmedKey] = value;
    }
  });

  // Ensure we always have a publishedAt date
  if (!metadata.publishedAt) {
    metadata.publishedAt = new Date().toISOString().split("T")[0];
  }

  return { metadata: metadata as ContentMetadata, content };
}

/**
 * Get all MDX files from a directory
 */
function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

/**
 * Read and parse a single MDX file
 */
function readMDXFile(filePath: string, contentType: ContentType = "blog") {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent, contentType);
}

/**
 * Get all MDX data from a directory
 */
function getMDXData(dir: string, contentType: ContentType = "blog"): ContentItem[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file), contentType);
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

/**
 * Get all blog posts
 */
export function getBlogPosts(): ContentItem[] {
  return getMDXData(
    path.join(process.cwd(), "src", "content", "posts"),
    "blog"
  );
}

/**
 * Get all gist posts
 */
export function getGistPosts(): ContentItem[] {
  return getMDXData(
    path.join(process.cwd(), "src", "content", "gists"),
    "gist"
  );
}

/**
 * Get content by type
 */
export function getContentByType(contentType: ContentType): ContentItem[] {
  return contentType === "blog" ? getBlogPosts() : getGistPosts();
}

/**
 * Format date with optional relative time
 */
export function formatDate(date: string, includeRelative = false): string {
  const currentDate = new Date();

  // Handle undefined or empty date
  if (!date) {
    date = new Date().toISOString().split("T")[0];
  }

  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}

/**
 * Get content item by slug
 */
export function getContentBySlug(
  slug: string, 
  contentType: ContentType
): ContentItem | undefined {
  const content = getContentByType(contentType);
  return content.find((item) => item.slug === slug);
}

/**
 * Get sorted content by date (newest first)
 */
export function getSortedContent(contentType: ContentType): ContentItem[] {
  const content = getContentByType(contentType);
  return content.sort((a, b) => {
    const dateA = new Date(a.metadata.publishedAt);
    const dateB = new Date(b.metadata.publishedAt);
    return dateB.getTime() - dateA.getTime();
  });
}