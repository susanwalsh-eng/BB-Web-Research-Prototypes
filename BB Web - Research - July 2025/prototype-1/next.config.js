/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: '/BB-Web-Research-Prototypes/prototype-1',
  assetPrefix: '/BB-Web-Research-Prototypes/prototype-1/',
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
};

export default nextConfig; 