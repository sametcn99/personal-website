> [!NOTE]
> I’m migrating this project to the .NET ecosystem because I’m tired of Next.js dependency hell and its heavy RAM usage.<br/>
> New repository: <https://github.com/sametcn99/personal-website-blazor>

# personal-website

A personal portfolio and blog website built with **Next.js 16**, **MDX**, and
**Material UI**. It serves MDX-based content (blog posts, technical gists, and
project showcases) with full-text search, RSS/JSON feeds, dynamic OG images, and
GitHub integration.

**Live:** [https://sametcc.me](https://sametcc.me)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Content Management](#content-management)
- [MDX Components](#mdx-components)
- [Feeds & SEO](#feeds--seo)
- [Analytics](#analytics)
- [Deployment](#deployment)

## Features

- **Three content types** — Blog posts, technical gists, and project pages, all
  written in MDX with YAML frontmatter.
- **Full-text search** — Client-side search powered by
  [Lunr.js](https://lunrjs.com/) across all content with persistent query state
  via localStorage.
- **Rich MDX rendering** — Custom components for code blocks (with syntax
  highlighting via `rehype-highlight`), Mermaid diagrams, KaTeX math equations,
  callouts, collapsible details/summary sections, tables, images with zoom, and
  more.
- **Dark theme UI** — Fully themed with Material UI (MUI v7) using a custom dark
  palette.
- **RSS & JSON Feed** — Auto-generated `/rss.xml` (RSS 2.0) and `/feed.json`
  (JSON Feed 1.1) endpoints combining all content types.
- **Dynamic OG images** — Open Graph images generated on the fly for pages.
- **GitHub integration** — Fetches repository data via Octokit; dedicated
  `/repo/[slug]` pages and dynamic `/readme` page that renders the GitHub
  profile README live.
- **Social link shortener** — `/link/[slug]` routes redirect to social media
  profiles (e.g., `/link/gh` → GitHub).
- **SEO optimized** — Automatic sitemap generation, `robots.txt`, JSON-LD
  structured data, and comprehensive meta tags.
- **PWA-ready** — Web App Manifest with icons, screenshots, and shortcuts.
- **CV / Resume** — Dedicated `/cv` page written in MDX with download support.
- **Writer mode** — Built-in Markdown editor at `/writer` for drafting content
  in the browser.
- **Article navigation** — Previous/next post navigation, reading time
  estimation, scroll progress indicator, and share button.
- **Sorting & filtering** — Content list pages support sorting by date or title,
  ascending/descending.
- **"I'm Feeling Lucky"** — Random content discovery feature on the homepage.
- **Multi-language support** — Content language auto-detection (Turkish/English)
  with language badge display.
- **Skeleton loading** — Smooth loading states with dedicated skeleton
  components for every section.

## Tech Stack

| Category                 | Technology                                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Framework**            | [Next.js 16](https://nextjs.org/) (App Router)                                                                                       |
| **Runtime**              | [Bun](https://bun.sh/)                                                                                                               |
| **Language**             | [TypeScript](https://www.typescriptlang.org/) (strict mode)                                                                          |
| **UI Library**           | [Material UI (MUI) v7](https://mui.com/)                                                                                             |
| **Content**              | [MDX](https://mdxjs.com/) via `@next/mdx` & `next-mdx-remote`                                                                        |
| **Styling**              | [Emotion](https://emotion.sh/) (MUI default)                                                                                         |
| **Search**               | [Lunr.js](https://lunrjs.com/)                                                                                                       |
| **Markdown Plugins**     | `remark-gfm`, `remark-math`, `remark-mdx-frontmatter`, `rehype-slug`, `rehype-autolink-headings`, `rehype-katex`, `rehype-highlight` |
| **Diagrams**             | [Mermaid](https://mermaid.js.org/)                                                                                                   |
| **GitHub API**           | [Octokit](https://github.com/octokit/octokit.js)                                                                                     |
| **RSS**                  | [rss](https://www.npmjs.com/package/rss) package                                                                                     |
| **Fonts**                | [Geist & Geist Mono](https://vercel.com/font) via `next/font`                                                                        |
| **Linting & Formatting** | [Biome](https://biomejs.dev/)                                                                                                        |
| **Testing**              | [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/)                                                         |
| **Deployment**           | [Vercel](https://vercel.com/) / Docker                                                                                               |

## Project Structure

```text
├── public/                     # Static assets (images, icons, uploads)
├── src/
│   ├── app/                    # Next.js App Router pages & API routes
│   │   ├── layout.tsx          # Root layout (MUI theme, fonts, analytics, footer)
│   │   ├── page.tsx            # Homepage (search, readme, content sections, links)
│   │   ├── blog/               # Blog listing & [slug] detail pages
│   │   ├── gist/               # Gist listing & [slug] detail pages
│   │   ├── project/            # Project listing & [slug] detail pages
│   │   ├── cv/                 # CV/Resume page (MDX) with download
│   │   ├── writer/             # In-browser Markdown editor
│   │   ├── readme/             # GitHub profile README rendered live
│   │   ├── rss/                # RSS info page
│   │   ├── rss.xml/            # RSS 2.0 feed endpoint
│   │   ├── feed.json/          # JSON Feed 1.1 endpoint
│   │   ├── link/[slug]/        # Social media link shortener/redirects
│   │   ├── repo/[slug]/        # GitHub repository detail pages
│   │   ├── og/                 # Dynamic Open Graph image generation
│   │   ├── support/            # Support/donate page
│   │   ├── privacy-policy/     # Privacy policy page
│   │   ├── api/                # API routes (blog, gists, projects)
│   │   ├── sitemap.ts          # Auto-generated sitemap
│   │   ├── robots.ts           # robots.txt generation
│   │   └── manifest.ts         # PWA Web App Manifest
│   ├── components/             # Reusable UI components
│   │   ├── home/               # Homepage sections (Search, Readme, Content, Links)
│   │   ├── mdx-components/     # Custom MDX rendering components
│   │   ├── skeletons/          # Loading skeleton components
│   │   ├── writer/             # Writer/editor components
│   │   ├── ArticleWrapper.tsx  # Shared article layout (meta, nav, tags)
│   │   ├── ContentListPage.tsx # Generic content listing with search & sort
│   │   └── ...                 # ShareButton, ScrollProgress, Footer, etc.
│   ├── content/                # MDX content files
│   │   ├── posts/              # Blog posts (.mdx)
│   │   ├── gists/              # Technical gists (.mdx)
│   │   └── projects/           # Project showcases (.mdx)
│   ├── hooks/                  # Custom React hooks
│   │   ├── useSearch.ts        # Search state with localStorage persistence
│   │   ├── useSort.ts          # Sort state management
│   │   ├── useTabs.ts          # Tab navigation state
│   │   └── ...
│   ├── lib/                    # Utility libraries
│   │   ├── content.ts          # MDX parsing, frontmatter extraction, content queries
│   │   ├── social.tsx          # Social media links configuration
│   │   ├── utils.ts            # GitHub API helpers (Octokit)
│   │   └── og.tsx              # OG image generation utilities
│   ├── types/                  # TypeScript type definitions
│   │   └── types.d.ts          # ContentMetadata, ContentItem, SocialMediaLink, etc.
│   ├── theme.ts                # MUI dark theme configuration
│   └── mdx-components.tsx      # MDX component registry
├── biome.json                  # Biome linter & formatter configuration
├── Dockerfile                  # Multi-stage Docker build (Bun-based)
├── jest.config.ts              # Jest test configuration
├── next.config.ts              # Next.js configuration (MDX plugins, images, standalone)
├── tsconfig.json               # TypeScript configuration (strict)
└── package.json                # Dependencies & scripts
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended runtime)
- [Node.js](https://nodejs.org/) v18+ (fallback)
- A GitHub personal access token (optional, for repo pages — set as `GH_TOKEN`
  env var)

### Installation

```bash
# Clone the repository
git clone https://github.com/sametcn99/personal-website.git
cd personal-website

# Install dependencies
bun install
```

### Environment Variables

| Variable               | Description                                        | Default                  |
| ---------------------- | -------------------------------------------------- | ------------------------ |
| `GH_TOKEN`             | GitHub personal access token for Octokit API calls | —                        |
| `NEXT_PUBLIC_SITE_URL` | Production site URL for feeds and OG images        | `http://localhost:3000`  |
| `NEXT_PUBLIC_BASE_URL` | Base URL for metadata and JSON-LD                  | `https://localhost:3000` |

### Running the Development Server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command          | Description                                 |
| ---------------- | ------------------------------------------- |
| `bun dev`        | Start the development server (webpack mode) |
| `bun run build`  | Create a production build                   |
| `bun start`      | Start the production server                 |
| `bun run check`  | Run Biome linter & formatter with auto-fix  |
| `bun run lint`   | Run Biome linter (check only)               |
| `bun run format` | Run Biome formatter with auto-fix           |
| `bun run jest`   | Run Jest test suite                         |

---

## Content Management

All content is stored as MDX files under `src/content/`:

```text
src/content/
├── posts/       # Blog posts
├── gists/       # Technical gists & tutorials
└── projects/    # Project showcases
```

### Frontmatter Schema

Each MDX file uses YAML frontmatter:

```yaml
---
title: "My Post Title"
publishedAt: "2025-01-15"
summary: "A brief summary of the post."
tags: [typescript, nextjs, react]
language: "en"
image: "/uploads/content/my-post/cover.png"
author: "sametcn99"
---
```

| Field         | Type           | Required | Description                                 |
| ------------- | -------------- | -------- | ------------------------------------------- |
| `title`       | `string`       | Yes      | Post title                                  |
| `publishedAt` | `string`       | Yes      | Publication date (`YYYY-MM-DD`)             |
| `summary`     | `string`       | Yes      | Short description                           |
| `tags`        | `string[]`     | No       | Comma-separated tags                        |
| `language`    | `"en" \| "tr"` | No       | Content language (auto-detected if omitted) |
| `image`       | `string`       | No       | Cover image path                            |
| `author`      | `string`       | No       | Author name                                 |

### Adding New Content

1. Create a new `.mdx` file in the appropriate directory (`posts/`, `gists/`, or
   `projects/`).
2. Add frontmatter at the top of the file.
3. Write your content using Markdown and custom MDX components.
4. The content will be automatically picked up — no configuration needed.

## MDX Components

The project provides a rich set of custom MDX components that are automatically
available in all MDX files:

| Component             | Description                                             |
| --------------------- | ------------------------------------------------------- |
| `h1`, `h2`, `h3`      | Styled headings with auto-generated anchor links        |
| `code` / `pre`        | Syntax-highlighted code blocks (via `rehype-highlight`) |
| `blockquote`          | Styled blockquote                                       |
| `table`               | Responsive styled tables                                |
| `img`                 | Images with zoom/pan support (`react-zoom-pan-pinch`)   |
| `a`                   | Smart links (internal vs external detection)            |
| `Callout`             | Info/warning/error callout boxes                        |
| `Details` / `Summary` | Collapsible sections                                    |
| `Mermaid`             | Mermaid diagram rendering                               |

## Feeds & SEO

### RSS & JSON Feed

- **RSS 2.0:** [`/rss.xml`](https://sametcc.me/rss.xml) — All content combined
- **JSON Feed 1.1:** [`/feed.json`](https://sametcc.me/feed.json) — All content
  combined
- **RSS info page:** [`/rss`](https://sametcc.me/rss)

Both feeds are auto-generated from all content types and include metadata, tags,
author info, and media content references.

### SEO Features

- **Sitemap** — Auto-generated at `/sitemap.xml` covering all static pages, blog
  posts, gists, projects, social link redirects, and GitHub repos.
- **robots.txt** — Generated at `/robots.txt`.
- **JSON-LD** — Structured data (`BlogPosting` schema) injected on article
  pages.
- **Open Graph & Twitter Cards** — Dynamic meta tags with auto-generated OG
  images.
- **Google Site Verification** — Configured in the root layout.

---

## Analytics

The site integrates multiple analytics providers:

- **[Microsoft Clarity](https://clarity.microsoft.com/)** — Session recordings
  and heatmaps.
- **[Umami](https://umami.is/)** — Privacy-focused, self-hosted web analytics.

---

## Deployment

### Coolify (VPS)

I deploy this project on my own [Coolify](https://coolify.io/) instance running
on a VPS. It uses the provided `Dockerfile` to build and run the containerized
application.

### Docker

A multi-stage Dockerfile is provided for containerized deployments:

```bash
# Build the Docker image
docker build -t personal-website .

# Run the container
docker run -p 3000:3000 personal-website
```

The Dockerfile uses Bun as the runtime, produces a standalone Next.js output,
includes a health check endpoint, and runs as a non-root user for security.
