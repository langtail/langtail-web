export interface ModelPricing {
  model: string
  max_tokens: number | null
  max_input_tokens: number | null
  max_output_tokens: number | null
  input_cost_per_token: number | null
  output_cost_per_token: number | null
  cache_read_input_token_cost: number | null
  litellm_provider: string
  mode: string
  supports_vision: boolean
  supports_function_calling: boolean
  supports_parallel_function_calling: boolean
  supports_response_schema: boolean
  supports_prompt_caching: boolean
}

export type FilterOperator = 
  | 'equals' 
  | 'contains' 
  | 'greater_than' 
  | 'less_than' 
  | 'greater_than_equal' 
  | 'less_than_equal'

export interface Filter {
  id: string
  column: keyof ModelPricing
  operator: FilterOperator
  value: string | number | boolean
}

export type SortDirection = 'asc' | 'desc' | null

export interface SortState {
  column: keyof ModelPricing | null
  direction: SortDirection
}

export interface RawModelDetails {
  max_tokens?: number
  max_input_tokens?: number
  max_output_tokens?: number
  input_cost_per_token?: number
  output_cost_per_token?: number
  cache_read_input_token_cost?: number
  litellm_provider?: string
  mode?: string
  supports_vision?: boolean
  supports_function_calling?: boolean
  supports_parallel_function_calling?: boolean
  supports_response_schema?: boolean
  supports_prompt_caching?: boolean
}

export interface PricingData {
  [key: string]: RawModelDetails
}