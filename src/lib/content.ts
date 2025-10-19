import fs from "node:fs";
import path from "node:path";

/**
 * Parse frontmatter from MDX content
 */
function parseFrontmatter(
  fileContent: string,
  contentType: ContentType = "blog",
): { metadata: ContentMetadata; content: string } {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    // If no frontmatter, extract title from first heading and generate metadata
    const titleMatch = fileContent.match(/^#\s+(.+)$/m);
    const title = titleMatch
      ? titleMatch[1]
      : contentType === "gist"
        ? "Untitled Gist"
        : contentType === "blog"
          ? "Untitled Blog Post"
          : "Untitled Project";
    const currentDate = new Date().toISOString().split("T")[0];
    const summaryText =
      contentType === "gist"
        ? "A short gist"
        : contentType === "blog"
          ? "A short blog post"
          : "A short project description";

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
  const frontMatterLines = frontMatterBlock.split(/\r?\n/);
  const metadata: Partial<ContentMetadata> = {};

  // Iterate with index so we can consume indented continuation lines for multiline values
  for (let i = 0; i < frontMatterLines.length; i++) {
    const rawLine = frontMatterLines[i];
    const line = rawLine.replace(/\r?\n$/, "");
    if (!line.trim()) continue;

    // If line contains key: value on same line
    if (line.includes(": ")) {
      const [key, ...valueArr] = line.split(": ");
      let value = valueArr.join(": ").trim();
      value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove surrounding quotes

      const trimmedKey = key.trim();

      // Handle arrays (like tags)
      if (
        trimmedKey === "tags" &&
        value.startsWith("[") &&
        value.endsWith("]")
      ) {
        const tagsString = value.slice(1, -1);
        (metadata as Record<string, string | string[]>)[trimmedKey] = tagsString
          .split(",")
          .map((tag) => tag.trim().replace(/^['"](.*)['"]$/, "$1"))
          .filter(Boolean);
        continue;
      }

      (metadata as Record<string, string | string[]>)[trimmedKey] = value;
      continue;
    }

    // If line ends with ':' it may have multiline indented value lines following (YAML style)
    if (line.trim().endsWith(":")) {
      const trimmedKey = line.trim().slice(0, -1).trim();
      const valueLines: string[] = [];

      // Collect subsequent indented lines as the value
      let j = i + 1;
      while (j < frontMatterLines.length) {
        const nextLine = frontMatterLines[j];
        // stop if next line is not indented
        if (!/^\s+/.test(nextLine)) break;
        valueLines.push(nextLine.trim());
        j++;
      }

      i = j - 1; // advance outer loop

      const joinedValue = valueLines.join(" ").replace(/^['"](.*)['"]$/, "$1");

      // Handle arrays (like tags) if someone used multiline array (rare)
      if (
        trimmedKey === "tags" &&
        joinedValue.startsWith("[") &&
        joinedValue.endsWith("]")
      ) {
        const tagsString = joinedValue.slice(1, -1);
        (metadata as Record<string, string | string[]>)[trimmedKey] = tagsString
          .split(",")
          .map((tag) => tag.trim().replace(/^['"](.*)['"]$/, "$1"))
          .filter(Boolean);
        continue;
      }

      (metadata as Record<string, string | string[]>)[trimmedKey] = joinedValue;
    }

    // Otherwise skip malformed line
  }

  // Ensure we always have a publishedAt date
  if (!metadata.publishedAt) {
    metadata.publishedAt = new Date().toISOString().split("T")[0];
  }

  // Attempt to infer language if not explicitly provided.
  // Simple heuristic: if content contains common Turkish characters, set 'tr'; else default 'en'.
  if (!metadata.language) {
    const turkishChars = /[çğıöşüÇĞİÖŞÜ]/;
    metadata.language = turkishChars.test(content) ? "tr" : "en";
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
function getMDXData(
  dir: string,
  contentType: ContentType = "blog",
): ContentItem[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(
      path.join(dir, file),
      contentType,
    );
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
    "blog",
  );
}

/**
 * Get all gist posts
 */
export function getGistPosts(): ContentItem[] {
  return getMDXData(
    path.join(process.cwd(), "src", "content", "gists"),
    "gist",
  );
}

/**
 * Get all gist posts
 */
export function getProjectPosts(): ContentItem[] {
  return getMDXData(
    path.join(process.cwd(), "src", "content", "projects"),
    "project",
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
  contentType: ContentType,
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
