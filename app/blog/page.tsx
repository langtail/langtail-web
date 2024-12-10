import { Card } from '@/components/ui/card'
import { format } from 'date-fns'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Langtail',
  description:
    'Latest articles about AI, prompt engineering, and LLM development',
  alternates: {
    canonical: `${process.env.CANONICAL_URL}/blog`,
  },
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-16 text-white text-center">
          From the blog
        </h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <Card className="overflow-hidden bg-gray-800/50 hover:bg-gray-800 border-gray-700/50 transition-all duration-300">
                <div className="flex gap-6 p-4">
                  <div className="w-48 h-48 relative shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={`Cover image for ${post.title}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col flex-1 py-2">
                    <time className="text-sm text-gray-500 mb-3">
                      {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                    </time>
                    <h2 className="text-2xl font-bold mb-3 text-gray-100 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-base line-clamp-2 mb-6">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={`Avatar of ${post.author.name}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-300">
                            {post.author.name}
                          </span>
                          {post.author.role && (
                            <span className="text-sm text-gray-500">
                              {post.author.role}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
