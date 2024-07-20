/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "codenest.app",
        pathname: "**",
      },

      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "githubprofileviewer.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
