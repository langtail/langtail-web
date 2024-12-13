'use client'

import { cn } from '@/lib/utils'
import { AssetImage } from '../ui/asset-image'
import { ModelPricing } from '@/lib/types/pricing'
import { mapProvider } from '@/lib/utils/provider-mapping'

interface ProviderLogoProps {
  model: ModelPricing
  className?: string
}

export function ProviderLogo({ model, className }: ProviderLogoProps) {
  const provider = mapProvider(model)
  
  // Map provider names to their logo files
  const logoMap: Record<string, string> = {
    'openai': '/images/logos/openai.svg',
    'anthropic': '/images/logos/anthropic.svg',
    'google': '/images/logos/google.svg',
    'azure': '/images/logos/azure.svg',
    'mistral': '/images/logos/mistral.svg',
    'cohere': '/images/logos/cohere.svg',
    'ai21': '/images/logos/ai21.svg',
    'aleph alpha': '/images/logos/aleph alpha.svg',
    'amazon': '/images/logos/amazon.svg',
    'anyscale': '/images/logos/anyscale.svg',
    'cerebras': '/images/logos/cerebras.svg',
    'cloudflare': '/images/logos/cloudflare.svg',
    'databricks': '/images/logos/databricks.svg',
    'deepinfra': '/images/logos/deepinfra.svg',
    'deepseek': '/images/logos/deepseek.svg',
    'fireworks ai': '/images/logos/fireworks ai.svg',
    'friendliai': '/images/logos/friendliai.svg',
    'groq': '/images/logos/groq.svg',
    'nlp cloud': '/images/logos/nlp cloud.svg',
    'ollama': '/images/logos/ollama.svg',
    'openrouter': '/images/logos/openrouter.svg',
    'perplexity': '/images/logos/perplexity.svg',
    'replicate': '/images/logos/replicate.svg',
    'voyage': '/images/logos/voyage.svg',
    'xai': '/images/logos/xAI.svg',
  }

  const logoPath = logoMap[provider] || null

  if (!logoPath) {
    return <span className={className}>{model.litellm_provider}</span>
  }

  return (
    <div className="flex items-center gap-2">
      <AssetImage
        src={logoPath}
        alt={`${model.litellm_provider} logo`}
        className={cn(
          'h-5 w-5',
          'dark:invert dark:brightness-0 dark:contrast-200',
          className
        )}
      />
      <span>{model.litellm_provider}</span>
    </div>
  )
}