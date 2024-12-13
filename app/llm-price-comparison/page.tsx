import { Metadata } from 'next'
import { assetPrefix } from '@/lib/utils'
import { PriceComparison } from '@/components/price-comparison'
import { transformPricingData } from '@/lib/utils/pricing'
import { generateStructuredData } from '@/lib/utils/structured-data'
import Script from 'next/script'

async function getPricingData() {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/BerriAI/litellm/refs/heads/main/model_prices_and_context_window.json',
      { next: { revalidate: 3600 } } // Revalidate every hour
    )
    if (!response.ok) {
      throw new Error('Failed to fetch pricing data')
    }
    const data = await response.json()
    return transformPricingData(data)
  } catch (error) {
    console.error('Error fetching pricing data:', error)
    return []
  }
}

export const metadata: Metadata = {
  title: 'LLM Price Comparison Tool | Langtail',
  description:
    'Compare prices between different LLM providers. Find the most cost-effective AI model for your use case.',
  alternates: {
    canonical: `${process.env.CANONICAL_URL}/llm-price-comparison`,
  },
  keywords: [
    'LLM pricing',
    'AI model costs',
    'language model comparison',
    'GPT pricing',
    'Claude pricing',
    'AI cost calculator',
  ],
  openGraph: {
    title: 'LLM Price Comparison Tool | Langtail',
    description:
      'Compare prices between different LLM providers. Find the most cost-effective AI model for your use case.',
    url: 'https://langtail.com/llm-price-comparison',
    siteName: 'Langtail',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${assetPrefix}/images/price-comparison/og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Langtail - LLM Price Comparison',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LLM Price Comparison Tool | Langtail',
    description:
      'Compare prices between different LLM providers. Find the most cost-effective AI model for your use case.',
    creator: '@langtail',
    images: [`${assetPrefix}/images/price-comparison/og.jpg`],
  },
}

export default async function PriceComparisonPage() {
  const models = await getPricingData()
  const structuredData = generateStructuredData(models)

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PriceComparison initialModels={models} />
    </>
  )
}
