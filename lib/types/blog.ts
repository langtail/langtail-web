import { z } from 'zod'

export const BlogFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.object({
    name: z.string(),
    avatar: z.string(),
    role: z.string().optional(),
  }),
  publishedAt: z.string(),
  coverImage: z.string(),
})

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>

export type BlogPost = BlogFrontmatter & {
  slug: string
}