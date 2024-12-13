'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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

interface FilterDialogProps {
  onAddFilter: (filter: Omit<Filter, 'id'>) => void
}

export function FilterDialog({ onAddFilter }: FilterDialogProps) {
  const [column, setColumn] = useState<keyof ModelPricing>('model')
  const [operator, setOperator] = useState<FilterOperator>('contains')
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)

  const columnType = getColumnType(column)

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

  const handleSubmit = () => {
    let processedValue: string | number | boolean = value
    
    if (columnType === 'number') {
      processedValue = Number(value)
    } else if (columnType === 'boolean') {
      processedValue = value === 'true'
    }

    onAddFilter({
      column,
      operator,
      value: processedValue,
    })
    setOpen(false)
    setValue('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Filter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Filter</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Select
              value={column}
              onValueChange={(value) => setColumn(value as keyof ModelPricing)}
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
          <div className="grid gap-2">
            <Select
              value={operator}
              onValueChange={(value) => setOperator(value as FilterOperator)}
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
          </div>
          <div className="grid gap-2">
            {columnType === 'boolean' ? (
              <Select value={value} onValueChange={setValue}>
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
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            )}
          </div>
        </div>
        <Button onClick={handleSubmit}>Add Filter</Button>
      </DialogContent>
    </Dialog>
  )
}