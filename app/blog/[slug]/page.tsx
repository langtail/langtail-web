import { format } from 'date-fns'
import { getBlogPost } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { RelatedPosts } from '@/components/related-posts'
import { getBlogPosts } from '@/lib/blog'
import { assetPrefix } from '@/lib/utils'
import Image from 'next/image'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { frontmatter } = await getBlogPost(params.slug)
    return {
      title: `${frontmatter.title} | Langtail Blog`,
      description: frontmatter.description,
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        type: 'article',
        authors: [frontmatter.author.name],
        images: [`${assetPrefix}${frontmatter.coverImage}`],
      },
    }
  } catch {
    return {
      title: 'Blog Post | Langtail',
      description: 'Langtail blog article',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const [{ frontmatter, content }, allPosts] = await Promise.all([
      getBlogPost(params.slug),
      getBlogPosts(),
    ])

    const relatedPosts = allPosts
      .filter((post) => post.slug !== params.slug)
      .slice(0, 3)

    return (
      <div className="min-h-screen">
        <div className="mx-auto max-w-3xl">
          <div className="relative mb-8 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900">
            <img
              src={`${assetPrefix}${frontmatter.coverImage}`}
              alt={`Cover image for ${frontmatter.title}`}
              width={1310}
              height={873}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/20" />
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <article className="max-w-3xl mx-auto">
            <time className="text-gray-400 mb-4 block">
              {format(new Date(frontmatter.publishedAt), 'MMMM d, yyyy')}
            </time>

            <h1 className="text-5xl font-bold text-white mb-8">
              {frontmatter.title}
            </h1>

            <div className="flex items-center gap-3 mb-12">
              <img
                src={frontmatter.author.avatar}
                alt={`Avatar of ${frontmatter.author.name}`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-white">
                  {frontmatter.author.name}
                </div>
                {frontmatter.author.role && (
                  <div className="text-sm text-gray-400">
                    {frontmatter.author.role}
                  </div>
                )}
              </div>
            </div>

            <div className="prose prose-invert prose-headings:text-white prose-p:text-gray-300 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-white prose-blockquote:border-indigo-500 prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-700/50 prose-pre:rounded-lg max-w-none prose-ul:text-gray-300 prose-li:marker:text-indigo-500">
              <div className="[&_pre]:!p-0 [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!border-0">
                {content}
              </div>
            </div>
            <div className="my-24 pt-12 border-t border-gray-800">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </article>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
