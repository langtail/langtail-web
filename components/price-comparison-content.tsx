'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { SearchBox } from './price-comparison/search-box'
import { ModelTable } from './price-comparison/model-table'
import { ModelPricing } from '@/lib/types/pricing'
import { transformPricingData } from '@/lib/utils/pricing'

export function PriceComparisonContent() {
  const [models, setModels] = useState<ModelPricing[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPricing() {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/BerriAI/litellm/refs/heads/main/model_prices_and_context_window.json'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch pricing data')
        }
        const data = await response.json()
        const modelList = transformPricingData(data)
        setModels(modelList)
        setLoading(false)
      } catch (err) {
        setError('Failed to load pricing data')
        setLoading(false)
      }
    }

    fetchPricing()
  }, [])

  const filteredModels = models.filter((model) =>
    model.model.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4 md:p-8 mt-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">LLM Price Comparison</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare pricing across different LLM providers. Find the most
            cost-effective model for your use case. Prices are shown per 1K tokens.
          </p>
        </div>

        <Card className="mb-8">
          <div className="p-6">
            <SearchBox value={searchTerm} onChange={setSearchTerm} />
          </div>
        </Card>

        <Card>
          <div className="rounded-md border">
            <ModelTable
              models={filteredModels}
              loading={loading}
              error={error}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}