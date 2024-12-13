'use client'

import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { SearchBox } from './search-box'
import { ModelTable } from './model-table'
import { Filter, ModelPricing } from '@/lib/types/pricing'
import { FilterPopover } from './filter-popover'
import { FilterBadge } from './filter-badge'
import { applyFilter } from '@/lib/utils/pricing'
import { QuickActions } from './quick-actions'
import { nanoid } from 'nanoid'

interface PriceComparisonProps {
  initialModels: ModelPricing[]
}

export function PriceComparison({ initialModels }: PriceComparisonProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<Filter[]>([])
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  })

  const handleAddFilter = (filter: Omit<Filter, 'id'>) => {
    setFilters((prev) => [...prev, { ...filter, id: nanoid() }])
  }

  const handleApplyPreset = (newFilters: Omit<Filter, 'id'>[], sort: SortState) => {
    // Clear existing filters and apply new ones
    setFilters(newFilters.map(filter => ({ ...filter, id: nanoid() })))
    setSortState(sort || { column: null, direction: null })
  }

  const handleRemoveFilter = (id: string) => {
    setFilters((prev) => prev.filter((f) => f.id !== id))
  }

  const filteredModels = useMemo(
    () =>
      initialModels.filter(
        (model) =>
          // Apply search filter
          (model.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            model.litellm_provider
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          // Apply all other filters
          filters.every((filter) => applyFilter(model, filter))
      ),
    [initialModels, searchTerm, filters]
  )

  const activeFilters = useMemo(
    () => filters.length > 0,
    [filters]
  )

  return (
    <div className="p-4 md:p-8 mt-5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">LLM Price Comparison</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare pricing across different LLM providers. Find the most
            cost-effective model for your use case. Prices are shown per 1M tokens.
          </p>
        </div>

        <QuickActions onApplyPreset={handleApplyPreset} />

        <Card className="mb-8 bg-gray-800/50 border-gray-700/50">
          <div className="p-6">
            <SearchBox 
              value={searchTerm} 
              onChange={setSearchTerm}
              placeholder="Search by model name or provider..." 
            />
          </div>
        </Card>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <FilterBadge
                key={filter.id}
                filter={filter}
                onRemove={handleRemoveFilter}
              />
            ))}
          </div>
          <FilterPopover onAddFilter={handleAddFilter} />
        </div>

        <Card className="bg-gray-800/50 border-gray-700/50">
          <div className="rounded-md border-gray-700/50 border">
            <ModelTable 
              models={filteredModels} 
              sortState={sortState}
              onSort={(column) => {
                setSortState((prev) => ({
                  column,
                  direction:
                    prev.column === column
                      ? prev.direction === 'asc'
                        ? 'desc'
                        : prev.direction === 'desc'
                        ? null
                        : 'asc'
                      : 'asc',
                }))
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}