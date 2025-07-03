import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/forest-wines-dashboard',
  assetPrefix: '/forest-wines-dashboard/',
};

export default nextConfig;
