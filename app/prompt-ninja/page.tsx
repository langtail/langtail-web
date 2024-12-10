import type { Metadata } from 'next'
import { assetPrefix } from '@/lib/utils'
import { PromptNinjaGame } from './prompt-ninja-game'

export const metadata: Metadata = {
  title: 'Prompt Ninja: The Ultimate AI Prompt Engineering Game | Langtail',
  description:
    'Test your prompt engineering skills against our ninja! Challenge yourself with our AI prompt engineering game and improve your skills.',
  keywords: [
    'prompt engineering',
    'AI',
    'language models',
    'LLM',
    'game',
    'challenge',
    'AI training',
    'prompt testing',
  ],
  authors: [{ name: 'Langtail Team' }],
  alternates: {
    canonical: `${process.env.CANONICAL_URL}/prompt-ninja`,
  },
  openGraph: {
    title: 'Prompt Ninja: The Ultimate AI Prompt Engineering Game | Langtail',
    description:
      'Test your prompt engineering skills against our ninja! Challenge yourself with our AI prompt engineering game and improve your skills.',
    url: 'https://langtail.com/prompt-ninja',
    siteName: 'Langtail',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${assetPrefix}/og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Langtail - Break My Prompt!',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Ninja: The Ultimate AI Prompt Engineering Game | Langtail',
    description:
      'Test your prompt engineering skills against our ninja! Challenge yourself with our AI prompt engineering game and improve your skills.',
    creator: '@langtail',
    images: [`${assetPrefix}/og.jpg`],
  },
}

export default function Page() {
  return <PromptNinjaGame />
}
