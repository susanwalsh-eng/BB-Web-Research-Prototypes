/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Only apply basePath and assetPrefix for production builds
  ...(process.env.NODE_ENV === "production" && {
    basePath: "/BB-Web-Research-Prototypes/July2025/build/prototype-2",
    assetPrefix: "/BB-Web-Research-Prototypes/July2025/build/prototype-2/",
    output: "export",
    trailingSlash: true,
  }),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
