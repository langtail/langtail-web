import { ModelPricing } from '../types/pricing'

export function generateStructuredData(models: ModelPricing[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: 'LLM Price Comparison',
    description: 'Comprehensive comparison of Large Language Model (LLM) pricing across different providers including OpenAI, Anthropic, Google, and more.',
    keywords: [
      'LLM pricing',
      'AI model costs',
      'language model comparison',
      'GPT pricing',
      'Claude pricing',
      'AI cost calculator',
      'machine learning costs',
      'NLP model pricing'
    ],
    creator: {
      '@type': 'Organization',
      name: 'Langtail',
      url: 'https://langtail.com'
    },
    dateModified: new Date().toISOString(),
    provider: models
      .map(model => model.litellm_provider)
      .filter((value, index, self) => self.indexOf(value) === index)
      .map(provider => ({
        '@type': 'Organization',
        name: provider
      })),
    about: {
      '@type': 'Thing',
      name: 'Language Models',
      description: 'Large Language Models (LLMs) and their associated pricing information'
    }
  }
}