// Create a function in the lib/utils.ts file as follows:
export const getSiteUrl = () => {
  // Dynamically generate the site URL based on the environment in which the page is running.

  // Check if the environment is production.
  const isProduction = process.env.NODE_ENV === "production";

  // Define the base URL for both production and local development environments.
  const baseUrl = isProduction ? "https://sametcc.me" : "http://localhost:3000";

  // Return the appropriate base URL based on the environment.
  return baseUrl;
};
