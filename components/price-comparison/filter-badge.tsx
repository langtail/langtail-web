'use client'

import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Filter } from '@/lib/types/pricing'
import { formatNumber, formatPrice } from '@/lib/utils/pricing'

interface FilterBadgeProps {
  filter: Filter
  onRemove: (id: string) => void
}

function formatFilterValue(filter: Filter): string {
  if (typeof filter.value === 'number') {
    if (filter.column.includes('cost')) {
      return formatPrice(filter.value)
    }
    return formatNumber(filter.value)
  }
  return String(filter.value)
}

function formatOperator(operator: Filter['operator']): string {
  switch (operator) {
    case 'equals':
      return 'is'
    case 'contains':
      return 'contains'
    case 'greater_than':
      return '>'
    case 'less_than':
      return '<'
    case 'greater_than_equal':
      return '≥'
    case 'less_than_equal':
      return '≤'
    default:
      return operator
  }
}

export function FilterBadge({ filter, onRemove }: FilterBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-gray-800/80 text-gray-300 px-2 py-1 rounded-md text-sm border border-gray-700/50">
      <span>{filter.column.replace(/_/g, ' ')}</span>
      <span>{formatOperator(filter.operator)}</span>
      <span>{formatFilterValue(filter)}</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-4 w-4 p-0 hover:bg-gray-700/50"
        onClick={() => onRemove(filter.id)}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}