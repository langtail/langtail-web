'use client'

import { forwardRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface QueryInputProps {
  onSubmit: (query: string) => void
  isLoading: boolean
}

export const QueryInput = forwardRef<HTMLInputElement, QueryInputProps>(
  ({ onSubmit, isLoading }, ref) => {
    const [query, setQuery] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(query ? query.trim() : '')
    }

    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          ref={ref}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Optional: What objects would you like to detect? (e.g. 'Cats')"
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          <Search className="w-4 h-4 mr-2" />
          {isLoading ? 'Detecting...' : 'Detect'}
        </Button>
      </form>
    )
  }
)

QueryInput.displayName = 'QueryInput'
