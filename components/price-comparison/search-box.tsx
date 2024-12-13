'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBox({ value, onChange, placeholder }: SearchBoxProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder || "Search models..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 bg-gray-900/50 border-gray-700/50 focus-visible:ring-gray-700"
      />
    </div>
  )
}