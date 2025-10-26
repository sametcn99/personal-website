# Copilot / AI agent instructions — personal-website

The goal: help make changes quickly and safely to a Next.js 15 app that serves MDX content (blog posts, gists, projects) from `src/content/*`. Keep changes small, follow existing patterns, and run the project's dev/build/test commands before proposing large changes.

## Developer instructions

- Use Bun.js for all commands (dev, build, test, lint, format) since the project is set up with Bun. Avoid using plain Node.js commands unless necessary.
- Always ensure TypeScript strictness is maintained.
- Follow existing code patterns and conventions throughout the project.
- Always write jsdoc comments for new functions and types.
- Always write texts in English.
- When changing content parsing or frontmatter, update `src/lib/content.ts` and verify all callers (search for `getBlogPosts`, `getGistPosts`, `getProjectPosts`).
- Don't push changes automatically; wait for user review and confirmation.
- Don't use plain HTML elements for UI; prefer MUI components.
- Always use MUI components for UI changes, following existing design patterns.