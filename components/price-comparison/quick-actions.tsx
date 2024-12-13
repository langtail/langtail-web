'use client'

import { Button } from '@/components/ui/button'
import { Sparkles, Zap, Brain, DollarSign, Eye } from 'lucide-react'
import type {
  Filter,
  SortState,
  FilterOperator,
  ModelPricing,
} from '@/lib/types/pricing'
import { nanoid } from 'nanoid'

interface QuickActionsProps {
  onApplyPreset: (filters: Omit<Filter, 'id'>[], sort: SortState | null) => void
}

type PresetType = {
  label: string
  icon: any
  filters: Array<{
    column: keyof ModelPricing
    operator: FilterOperator
    value: boolean | number
  }>
  sort: SortState | null
}

export function QuickActions({ onApplyPreset }: QuickActionsProps) {
  const presets: PresetType[] = [
    {
      label: 'Cheapest Models',
      icon: DollarSign,
      filters: [],
      sort: {
        column: 'output_cost_per_token',
        direction: 'asc',
      },
    },
    {
      label: 'Largest Context',
      icon: Brain,
      filters: [
        {
          column: 'max_input_tokens',
          operator: 'greater_than',
          value: 100000,
        },
      ],
      sort: {
        column: 'max_input_tokens',
        direction: 'desc',
      },
    },
    {
      label: 'Vision Models',
      icon: Eye,
      filters: [
        {
          column: 'supports_vision',
          operator: 'equals',
          value: true,
        },
      ],
      sort: null,
    },
    {
      label: 'Function Calling',
      icon: Zap,
      filters: [
        {
          column: 'supports_function_calling',
          operator: 'equals',
          value: true,
        },
      ],
      sort: null,
    },
    {
      label: 'Full Featured',
      icon: Sparkles,
      filters: [
        {
          column: 'supports_vision',
          operator: 'equals',
          value: true,
        },
        {
          column: 'supports_function_calling',
          operator: 'equals',
          value: true,
        },
        {
          column: 'supports_response_schema',
          operator: 'equals',
          value: true,
        },
      ],
      sort: null,
    },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {presets.map((preset) => (
        <Button
          key={preset.label}
          variant="outline"
          size="sm"
          onClick={() => onApplyPreset(preset.filters, preset.sort)}
        >
          <preset.icon className="mr-2 h-4 w-4" />
          {preset.label}
        </Button>
      ))}
    </div>
  )
}
