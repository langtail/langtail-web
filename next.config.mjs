/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx'

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: process.env.NEXT_PUBLIC_VERCEL === '1' ? undefined : 'standalone',
  async rewrites() {
    return [
      {
        source: '/mp/decide',
        destination: 'https://decide.mixpanel.com/decide',
      },
      {
        source: '/mp/:slug',
        destination: 'https://api-eu.mixpanel.com/:slug',
      },
    ]
  },
  async headers() {
    // Get allowed origins from environment variable
    const allowedOrigins =
      process.env.ALLOWED_ORIGINS || 'http://localhost:3001'

    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: allowedOrigins,
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: allowedOrigins,
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400',
          },
        ],
      },
      {
        source: '/images/:all*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: allowedOrigins,
          },
          {
            key: 'Cache-Control',
            value:
              'public, max-age=31536000, immutable, stale-while-revalidate=86400',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
          },
          {
            key: 'Pragma',
            value: 'public',
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 31536000000).toUTCString(),
          },
        ],
      },
    ]
  },
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : `http://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
  images: {
    domains: ['langtail.com', 'langtail-web.vercel.app'],
  },
}

export default withMDX(nextConfig)
