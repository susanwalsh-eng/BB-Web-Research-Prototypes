/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: '/BB-Web-Research-Prototypes/July2025/build/prototype-2',
  assetPrefix: '/BB-Web-Research-Prototypes/July2025/build/prototype-2/',
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
};

export default nextConfig; 