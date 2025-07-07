/** @type {import('next').NextConfig} */

const repoName = "BB-Web-Research-Prototypes";

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
      ? `/${repoName}/BB Web - Research - July 2025/prototype-2`
      : "",
  assetPrefix:
    process.env.NODE_ENV === "production" && !process.env.LOCAL
      ? `/${repoName}/BB Web - Research - July 2025/prototype-2`
      : "",
};

module.exports = nextConfig;
