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
  // GitHub Pages configuration - only apply basePath for production builds
  basePath:
    process.env.NODE_ENV === "production" && !process.env.LOCAL
      ? "/BB-Web-Research-Prototypes"
      : "",
  assetPrefix:
    process.env.NODE_ENV === "production" && !process.env.LOCAL
      ? "/BB-Web-Research-Prototypes"
      : "",
};

module.exports = nextConfig;
