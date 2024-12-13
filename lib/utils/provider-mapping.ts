import { ModelPricing } from '../types/pricing'

// Map model names/providers to their actual provider
export function mapProvider(model: ModelPricing): string {
  const modelName = model.model.toLowerCase()
  const provider = model.litellm_provider.toLowerCase()

  // Azure models
  if (provider === 'azure') {
    return 'azure'
  }

  // Google/Vertex AI related models
  if (
    provider === 'vertex_ai' ||
    provider.includes('vertex') ||
    provider === 'palm' ||
    modelName.includes('gemini') ||
    modelName.includes('palm')
  ) {
    return 'google'
  }

  // Amazon/Bedrock related models
  if (provider === 'bedrock' || provider.includes('amazon')) {
    return 'amazon'
  }

  // OpenAI models (including text completion)
  if (provider.includes('openai') && !provider.includes('azure')) {
    return 'openai'
  }

  // Anthropic models
  if (provider.includes('anthropic') || modelName.includes('claude')) {
    return 'anthropic'
  }

  // Return the original provider if no specific mapping is found
  return provider
}