// lib/utils.ts

/**
 * Determines if the application is running in a production environment.
 */
const isProduction: boolean = process.env.NODE_ENV === "production";

/**
 * The base URL for both production and local development environments.
 * Use the actual production URL when in production.
 */
export const siteUrl: string = isProduction
  ? "https://sametcc.me"
  : "http://localhost:3000";
