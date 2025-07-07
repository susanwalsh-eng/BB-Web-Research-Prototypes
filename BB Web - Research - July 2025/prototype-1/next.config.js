/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // GitHub Pages configuration
  basePath:
    process.env.NODE_ENV === "production" ? "/BB-Web-Research-Prototypes" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/BB-Web-Research-Prototypes" : "",
};

module.exports = nextConfig;
