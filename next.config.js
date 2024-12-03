/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  output: process.env.NEXT_PUBLIC_VERCEL === '1' ? undefined : 'standalone'
};

module.exports = nextConfig;