import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import { BlogFrontmatterSchema, type BlogFrontmatter } from './types/blog'
import { assetPrefix } from './utils'

import { MDXComponents } from '@/mdx-components'

const blogDir = path.join(process.cwd(), 'content/blog')

export async function getBlogPosts() {
  const files = fs.readdirSync(blogDir)
  const posts = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace('.mdx', '')
      const filePath = path.join(blogDir, filename)
      const fileContent = fs.readFileSync(filePath, 'utf8')

      const { frontmatter } = await compileMDX<BlogFrontmatter>({
        source: fileContent,
        options: { parseFrontmatter: true },
      })

      return {
        ...frontmatter,
        coverImage: `${assetPrefix}${frontmatter.coverImage}`,
        slug,
      }
    })
  )

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getBlogPost(slug: string) {
  const filePath = path.join(blogDir, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')

  const { frontmatter, content } = await compileMDX<BlogFrontmatter>({
    source: fileContent,
    options: { parseFrontmatter: true },
    components: MDXComponents(),
  })

  return { frontmatter, content, slug }
}
