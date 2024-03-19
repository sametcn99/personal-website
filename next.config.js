/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,
  images: {
    domains: ['raw.githubusercontent.com', 'githubprofileviewer.com', "avatars.githubusercontent.com"],
  }
};

module.exports = nextConfig;
