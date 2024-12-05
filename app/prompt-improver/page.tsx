import { Metadata } from 'next'
import { assetPrefix } from '@/lib/utils'
import { PromptImproverContent } from '@/components/prompt-improver-content'

export const metadata: Metadata = {
  title: 'Langtail - Improve Your Prompt!',
  description:
    'Make your AI prompts more robust and effective with our Prompt Sensei. Get expert guidance to enhance your prompt engineering skills.',
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
    title: 'Langtail - Improve Your Prompt!',
    description:
      'Make your AI prompts more robust and effective with our Prompt Sensei. Get expert guidance to enhance your prompt engineering skills.',
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
    title: 'Langtail - Improve Your Prompt!',
    description:
      'Make your AI prompts more robust and effective with our Prompt Sensei. Get expert guidance to enhance your prompt engineering skills.',
    creator: '@langtail',
    images: [`${assetPrefix}/og-prompt-improver.jpg`],
  },
}

export default function ImprovePage() {
  return <PromptImproverContent />
}
