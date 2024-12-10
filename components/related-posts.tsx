'use client'

import { Card } from '@/components/ui/card'
import { format } from 'date-fns'
import Link from 'next/link'
import type { BlogPost } from '@/lib/types/blog'

interface RelatedPostsProps {
  posts: BlogPost[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts.length) return null

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-gray-100">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <Card className="h-full overflow-hidden bg-gray-800/50 hover:bg-gray-800 border-gray-700/50 transition-all duration-300">
              <div className="aspect-[2/1] relative">
                <img
                  src={post.coverImage}
                  alt={`Cover image for ${post.title}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <time className="text-sm text-gray-500 mb-2 block">
                  {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                </time>
                <h3 className="text-lg font-bold mb-2 text-gray-100 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2">
                  {post.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}