import fs from 'fs'
import path from 'path'

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

function generateSitemap() {
  const links = [...getToolRoutes(), ...getBlogPosts(), '/blog']

  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  // Write sitemap to public directory
  fs.writeFileSync(
    path.join(publicDir, 'sitemap.json'),
    JSON.stringify(links, null, 2)
  )

  console.log('✅ Sitemap generated successfully')
}

generateSitemap()
