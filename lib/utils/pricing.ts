import { ModelPricing, PricingData, RawModelDetails, Filter } from '../types/pricing'

export function formatPrice(pricePerToken: number): string {
  if (!pricePerToken) {
    return 'N/A'
  }
  // Convert price per token to price per 1M tokens
  const pricePerMillion = pricePerToken * 1000000
  return `$${pricePerMillion.toFixed(2)}`
}

export function formatNumber(num: number): string {
  if (!num) {
    return 'N/A'
  }
  return num.toLocaleString()
}

export function isRelevantModel(model: string): boolean {
  // Filter out fine-tuned models
  if (model.startsWith('ft:') || model.startsWith('FT::')) {
    return false
  }

  const relevantTerms = ['chat', 'gpt', 'claude', 'palm', 'gemini']
  return relevantTerms.some(term => model.toLowerCase().includes(term))
}

export function transformPricingData(data: PricingData): ModelPricing[] {
  return Object.entries(data)
    .filter(([model]) => isRelevantModel(model))
    .map(([model, details]: [string, RawModelDetails]) => ({
      model,
      max_tokens: details.max_tokens || null,
      max_input_tokens: details.max_input_tokens || null,
      max_output_tokens: details.max_output_tokens || null,
      input_cost_per_token: details.input_cost_per_token || null,
      output_cost_per_token: details.output_cost_per_token || null,
      cache_read_input_token_cost: details.cache_read_input_token_cost || null,
      litellm_provider: details.litellm_provider ?? 'Unknown',
      mode: details.mode ?? 'chat',
      supports_vision: details.supports_vision ?? false,
      supports_function_calling: details.supports_function_calling ?? false,
      supports_parallel_function_calling: details.supports_parallel_function_calling ?? false,
      supports_response_schema: details.supports_response_schema ?? false,
      supports_prompt_caching: details.supports_prompt_caching ?? false,
    }))
}

export function getColumnType(column: keyof ModelPricing): 'string' | 'number' | 'boolean' {
  const numericColumns = [
    'max_tokens',
    'max_input_tokens',
    'max_output_tokens',
    'input_cost_per_token',
    'output_cost_per_token',
    'cache_read_input_token_cost'
  ]

  const booleanColumns = [
    'supports_vision',
    'supports_function_calling',
    'supports_parallel_function_calling',
    'supports_response_schema',
    'supports_prompt_caching'
  ]

  if (numericColumns.includes(column)) return 'number'
  if (booleanColumns.includes(column)) return 'boolean'
  return 'string'
}

export function applyFilter(model: ModelPricing, filter: Filter): boolean {
  const value = model[filter.column]
  const filterValue = filter.value

  switch (filter.operator) {
    case 'equals':
      return value === filterValue
    case 'contains':
      return String(value).toLowerCase().includes(String(filterValue).toLowerCase())
    case 'greater_than':
      return typeof value === 'number' && value > Number(filterValue)
    case 'less_than':
      return typeof value === 'number' && value < Number(filterValue)
    case 'greater_than_equal':
      return typeof value === 'number' && value >= Number(filterValue)
    case 'less_than_equal':
      return typeof value === 'number' && value <= Number(filterValue)
    default:
      return true
  }
}