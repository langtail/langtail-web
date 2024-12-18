import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { headers } from 'next/headers'

// Helper function to get blog post slugs
function getBlogPosts() {
  const blogDir = path.join(process.cwd(), 'content/blog')
  const files = fs.readdirSync(blogDir)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => `/blog/${file.replace('.mdx', '')}`)
}

// Helper function to get tool routes
function getToolRoutes() {
  const appDir = path.join(process.cwd(), 'app')
  const items = fs.readdirSync(appDir, { withFileTypes: true })

  return items
    .filter((item) => item.isDirectory())
    .map((item) => `/${item.name}`)
    .filter(
      (route) =>
        !route.startsWith('/api') && !route.startsWith('/blog') && route !== '/'
    )
}

export async function GET() {
  try {
    const headersList = headers()
    const apiKey = headersList.get('x-api-key')

    if (
      !process.env.SITEMAP_API_KEY ||
      apiKey !== process.env.SITEMAP_API_KEY
    ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const links = {
      tools: getToolRoutes(),
      blogPosts: getBlogPosts(),
      pages: ['/blog'],
    }

    return NextResponse.json(links)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    )
  }
}
