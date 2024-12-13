'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ModelPricing } from '@/lib/types/pricing'
import { formatPrice, formatNumber } from '@/lib/utils/pricing'
import { ProviderLogo } from './provider-logo'
import { Check, X, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { useState, useMemo } from 'react'
import { Button } from '../ui/button'
import type { SortState } from '@/lib/types/pricing'

interface ModelTableProps {
  models: ModelPricing[]
  sortState: SortState
  onSort: (column: keyof ModelPricing) => void
}

interface SortableHeaderProps {
  column: keyof ModelPricing
  label: string
  sortState: SortState
  onSort: (column: keyof ModelPricing) => void
  align?: 'left' | 'right' | 'center'
}

function SortableHeader({
  column,
  label,
  sortState,
  onSort,
  align = 'left',
}: SortableHeaderProps) {
  const isActive = sortState.column === column

  return (
    <TableHead
      className={
        align === 'right'
          ? 'text-right'
          : align === 'center'
            ? 'text-center'
            : ''
      }
    >
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-accent hover:bg-gray-700/50 text-gray-300"
        onClick={() => onSort(column)}
      >
        {label}
        {isActive ? (
          sortState.direction === 'asc' ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )
        ) : (
          <ArrowUpDown className="ml-2 h-4 w-4" />
        )}
      </Button>
    </TableHead>
  )
}

export function ModelTable({ models, sortState, onSort }: ModelTableProps) {
  const sortedModels = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return models
    }

    return [...models].sort((a, b) => {
      const aValue = a[sortState.column!]
      const bValue = b[sortState.column!]

      if (typeof aValue === 'boolean') {
        return sortState.direction === 'asc'
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue)
      }

      if (typeof aValue === 'number') {
        return sortState.direction === 'asc'
          ? aValue - (bValue as number)
          : (bValue as number) - aValue
      }

      const aStr = String(aValue).toLowerCase()
      const bStr = String(bValue).toLowerCase()
      return sortState.direction === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr)
    })
  }, [models, sortState])

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-gray-800/50 border-gray-700/50">
          <SortableHeader
            column="model"
            label="Model"
            sortState={sortState}
            onSort={onSort}
          />
          <SortableHeader
            column="litellm_provider"
            label="Provider"
            sortState={sortState}
            onSort={onSort}
          />
          <SortableHeader
            column="max_input_tokens"
            label="Max Input Length"
            sortState={sortState}
            onSort={onSort}
            align="right"
          />
          <SortableHeader
            column="max_output_tokens"
            label="Max Output Length"
            sortState={sortState}
            onSort={onSort}
            align="right"
          />
          <SortableHeader
            column="input_cost_per_token"
            label="Input Price (per 1M tokens)"
            sortState={sortState}
            onSort={onSort}
            align="right"
          />
          <SortableHeader
            column="output_cost_per_token"
            label="Output Price (per 1M tokens)"
            sortState={sortState}
            onSort={onSort}
            align="right"
          />
          <SortableHeader
            column="cache_read_input_token_cost"
            label="Cache Read Price (per 1M tokens)"
            sortState={sortState}
            onSort={onSort}
            align="right"
          />
          <SortableHeader
            column="supports_vision"
            label="Supports Vision"
            sortState={sortState}
            onSort={onSort}
            align="center"
          />
          <SortableHeader
            column="supports_function_calling"
            label="Functions"
            sortState={sortState}
            onSort={onSort}
            align="center"
          />
          <SortableHeader
            column="supports_parallel_function_calling"
            label="Parallel Functions"
            sortState={sortState}
            onSort={onSort}
            align="center"
          />
          <SortableHeader
            column="supports_response_schema"
            label="Structured Output"
            sortState={sortState}
            onSort={onSort}
            align="center"
          />
          <SortableHeader
            column="supports_prompt_caching"
            label="Prompt Caching"
            sortState={sortState}
            onSort={onSort}
            align="center"
          />
        </TableRow>
      </TableHeader>
      <TableBody>
        {models.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={12}
              className="h-24 text-center text-muted-foreground"
            >
              No models found
            </TableCell>
          </TableRow>
        ) : (
          sortedModels.map((model, index) => (
            <TableRow
              key={model.model}
              className="hover:bg-gray-800/50 border-gray-700/50"
            >
              <TableCell className="font-medium">
                {model.model.split('/').pop()}
              </TableCell>
              <TableCell>
                <ProviderLogo model={model} />
              </TableCell>
              <TableCell className="text-right">
                {model.max_input_tokens !== null
                  ? formatNumber(model.max_input_tokens)
                  : '-'}
              </TableCell>
              <TableCell className="text-right">
                {model.max_output_tokens !== null
                  ? formatNumber(model.max_output_tokens)
                  : '-'}
              </TableCell>
              <TableCell className="text-right">
                {model.input_cost_per_token !== null
                  ? formatPrice(model.input_cost_per_token)
                  : '-'}
              </TableCell>
              <TableCell className="text-right">
                {model.output_cost_per_token !== null
                  ? formatPrice(model.output_cost_per_token)
                  : '-'}
              </TableCell>
              <TableCell className="text-right">
                {model.cache_read_input_token_cost !== null
                  ? formatPrice(model.cache_read_input_token_cost)
                  : '-'}
              </TableCell>
              <TableCell className="text-center">
                {model.supports_vision ? (
                  <Check className="h-4 w-4 mx-auto text-green-500" />
                ) : (
                  <X className="h-4 w-4 mx-auto text-red-500 opacity-50" />
                )}
              </TableCell>
              <TableCell className="text-center">
                {model.supports_function_calling ? (
                  <Check className="h-4 w-4 mx-auto text-green-500" />
                ) : (
                  <X className="h-4 w-4 mx-auto text-red-500 opacity-50" />
                )}
              </TableCell>
              <TableCell className="text-center">
                {model.supports_parallel_function_calling ? (
                  <Check className="h-4 w-4 mx-auto text-green-500" />
                ) : (
                  <X className="h-4 w-4 mx-auto text-red-500 opacity-50" />
                )}
              </TableCell>
              <TableCell className="text-center">
                {model.supports_response_schema ? (
                  <Check className="h-4 w-4 mx-auto text-green-500" />
                ) : (
                  <X className="h-4 w-4 mx-auto text-red-500 opacity-50" />
                )}
              </TableCell>
              <TableCell className="text-center">
                {model.supports_prompt_caching ? (
                  <Check className="h-4 w-4 mx-auto text-green-500" />
                ) : (
                  <X className="h-4 w-4 mx-auto text-red-500 opacity-50" />
                )}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
