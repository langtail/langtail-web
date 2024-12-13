'use client'

import { useState, useEffect } from 'react'
import { Plus, X } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Filter, FilterOperator, ModelPricing } from '@/lib/types/pricing'
import { getColumnType } from '@/lib/utils/pricing'
import { nanoid } from 'nanoid'

interface FilterPopoverProps {
  onAddFilter: (filter: Omit<Filter, 'id'>) => void
}

interface FilterRow {
  id: string
  column: keyof ModelPricing
  operator: FilterOperator
  value: string
}

export function FilterPopover({ onAddFilter }: FilterPopoverProps) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<FilterRow[]>([
    { id: nanoid(), column: 'model', operator: 'contains', value: '' }
  ])

  const addFilterRow = () => {
    setFilters(prev => [...prev, {
      id: nanoid(),
      column: 'model',
      operator: 'contains',
      value: ''
    }])
  }

  const removeFilterRow = (id: string) => {
    setFilters(prev => prev.filter(f => f.id !== id))
  }

  const updateFilter = (id: string, field: keyof FilterRow, value: any) => {
    setFilters(prev => prev.map(filter => {
      if (filter.id === id) {
        if (field === 'column') {
          const columnType = getColumnType(value as keyof ModelPricing)
          return {
            ...filter,
            [field]: value,
            operator: columnType === 'string' ? 'contains' : 
                     columnType === 'number' ? 'greater_than' : 'equals',
            value: ''
          }
        }
        return { ...filter, [field]: value }
      }
      return filter
    }))
  }

  const handleSubmit = () => {
    filters.forEach(filter => {
      const columnType = getColumnType(filter.column)
      let processedValue: string | number | boolean = filter.value
      
      if (columnType === 'number') {
        processedValue = Number(filter.value)
      } else if (columnType === 'boolean') {
        processedValue = filter.value === 'true'
      }

      onAddFilter({
        column: filter.column,
        operator: filter.operator,
        value: processedValue,
      })
    })
    setOpen(false)
    setFilters([{ id: nanoid(), column: 'model', operator: 'contains', value: '' }])
  }

  const isValid = filters.every(f => f.value !== '')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="start">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Filters</h4>
            <p className="text-sm text-muted-foreground">
              Filter models based on multiple criteria
            </p>
          </div>

          <div className="space-y-4">
            {filters.map((filter, index) => {
              const columnType = getColumnType(filter.column)
              const stringOperators: FilterOperator[] = ['equals', 'contains']
              const numberOperators: FilterOperator[] = [
                'equals',
                'greater_than',
                'less_than',
                'greater_than_equal',
                'less_than_equal',
              ]
              const booleanOperators: FilterOperator[] = ['equals']

              const operators = {
                string: stringOperators,
                number: numberOperators,
                boolean: booleanOperators,
              }[columnType]

              return (
                <div key={filter.id} className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <Select
                        value={filter.column}
                        onValueChange={(value) => updateFilter(filter.id, 'column', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select column" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="model">Model</SelectItem>
                          <SelectItem value="litellm_provider">Provider</SelectItem>
                          <SelectItem value="max_input_tokens">Max Input Length</SelectItem>
                          <SelectItem value="max_output_tokens">Max Output Length</SelectItem>
                          <SelectItem value="input_cost_per_token">Input Price</SelectItem>
                          <SelectItem value="output_cost_per_token">Output Price</SelectItem>
                          <SelectItem value="cache_read_input_token_cost">Cache Read Price</SelectItem>
                          <SelectItem value="supports_vision">Supports Vision</SelectItem>
                          <SelectItem value="supports_function_calling">Functions</SelectItem>
                          <SelectItem value="supports_parallel_function_calling">Parallel Functions</SelectItem>
                          <SelectItem value="supports_response_schema">Structured Output</SelectItem>
                          <SelectItem value="supports_prompt_caching">Prompt Caching</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {filters.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFilterRow(filter.id)}
                        className="h-10 w-10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={filter.operator}
                      onValueChange={(value) => updateFilter(filter.id, 'operator', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select operator" />
                      </SelectTrigger>
                      <SelectContent>
                        {operators.map((op) => (
                          <SelectItem key={op} value={op}>
                            {op.replace(/_/g, ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {columnType === 'boolean' ? (
                      <Select 
                        value={filter.value}
                        onValueChange={(value) => updateFilter(filter.id, 'value', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select value" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        type={columnType === 'number' ? 'number' : 'text'}
                        placeholder="Enter value"
                        value={filter.value}
                        onChange={(e) => updateFilter(filter.id, 'value', e.target.value)}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={addFilterRow}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Filter
            </Button>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!isValid}
          >
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}