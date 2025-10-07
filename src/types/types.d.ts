/** biome-ignore-all lint/correctness/noUnusedVariables: type definitions file */

type SocialMediaLink = {
  link: URL | string;
  label: string;
  type: string[];
  visible: boolean;
  category:
    | "Professional Networks"
    | "Development Platforms"
    | "Social Media"
    | "Contact"
    | "Other";
  icon?: React.ReactNode; // Add optional icon property
  external?: boolean; // Add optional external property
};

// Extended metadata type that supports both blog and gist content
type ContentMetadata = {
  title: string;
  href: string;
  publishedAt: string;
  summary: string;
  image?: string;
  author?: string;
  tags?: string[];
  language?: "tr" | "en" | string;
  onProduction?: boolean;
};

type ContentType = "blog" | "gist" | "project";

interface ContentItem {
  metadata: ContentMetadata;
  slug: string;
  content: string;
}
