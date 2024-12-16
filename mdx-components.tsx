import type { MDXComponents } from 'mdx/types'
import { CodeBlock } from '@/components/mdx-code-block'
import { assetPrefix } from '@/lib/utils'
import { ButtonLink } from '@/components/ui/button-link'
import { BlogCarousel, BlogCarouselProps } from '@/components/blog-carousel'

// This file is required to use MDX in `app` directory.
export function MDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl mb-8 mt-16">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mb-6 mt-16">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4 mt-12">
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="leading-7 mb-6">{children}</p>,
    a: ({ children, href }) => (
      <a
        href={href}
        className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="my-8 ml-6 list-disc space-y-3 marker:text-indigo-500">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-8 ml-6 list-decimal space-y-3">{children}</ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-indigo-500 pl-6 py-3 bg-indigo-950/30 italic">
        {children}
      </blockquote>
    ),
    img: ({ src, alt }) => (
      <img
        src={`${assetPrefix}${src}`}
        alt={alt}
        className="mt-8 rounded-xl shadow-xl bg-gray-800 p-2"
      />
    ),
    pre: ({ children }) => children,
    code: ({ children, className }) => {
      const language = className?.replace('language-', '')
      if (typeof children !== 'string') return null
      return (
        <CodeBlock language={language} className="my-6">
          {children}
        </CodeBlock>
      )
    },
    BlogCarousel: ({ images }: BlogCarouselProps) => (
      <BlogCarousel images={images} />
    ),
    Button: ({ children, href }) => (
      <ButtonLink href={href}>{children}</ButtonLink>
    ),
    ...components,
  }
}
