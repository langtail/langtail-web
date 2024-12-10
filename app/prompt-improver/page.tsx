import { Metadata } from 'next'
import { assetPrefix } from '@/lib/utils'
import { PromptImproverContent } from '@/components/prompt-improver-content'

export const metadata: Metadata = {
  title: 'White Ninja: Intent-Based Prompt Engineering Tool | Langtail',
  description:
    'Let White Ninja guide you in transforming your ideas into perfect prompts. Our intent-based prompt engineering tool provides AI-powered assistance to create clear, effective, and precise prompts every time.',
  keywords: [
    'prompt engineering',
    'AI prompts',
    'prompt improvement',
    'LLM optimization',
    'AI training',
    'prompt optimization',
    'prompt sensei',
  ],
  openGraph: {
    title: 'White Ninja: Intent-Based Prompt Engineering Tool | Langtail',
    description:
      'Let White Ninja guide you in transforming your ideas into perfect prompts. Our intent-based prompt engineering tool provides AI-powered assistance to create clear, effective, and precise prompts every time.',
    url: 'https://langtail.com/prompt-improver',
    siteName: 'Langtail',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${assetPrefix}/og-prompt-improver.jpg`,
        width: 1200,
        height: 630,
        alt: 'Langtail - Improve Your Prompt!',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'White Ninja: Intent-Based Prompt Engineering Tool | Langtail',
    description:
      'Let White Ninja guide you in transforming your ideas into perfect prompts. Our intent-based prompt engineering tool provides AI-powered assistance to create clear, effective, and precise prompts every time.',
    creator: '@langtail',
    images: [`${assetPrefix}/og-prompt-improver.jpg`],
  },
}

export default function ImprovePage() {
  return <PromptImproverContent />
}
