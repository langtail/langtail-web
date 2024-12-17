'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronDown, ChevronUp, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Annotation } from '../types'

interface JsonViewerProps {
  annotations: Annotation[]
}

export function JsonViewer({ annotations }: JsonViewerProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(annotations, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (annotations.length === 0) return null

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
          JSON Output
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className={cn(
            'gap-2',
            copied && 'text-green-500 dark:text-green-400'
          )}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? 'Copied!' : 'Copy'}
        </Button>
      </div>

      <div
        className={cn(
          'overflow-hidden transition-all duration-200 ease-in-out',
          isExpanded ? 'max-h-96' : 'max-h-0'
        )}
      >
        <Card className="bg-gray-800/50 border-gray-700/50">
          <div className="p-4 max-h-80 overflow-auto">
            <pre className="text-sm">
              <code>{JSON.stringify(annotations, null, 2)}</code>
            </pre>
          </div>
        </Card>
      </div>
    </div>
  )
}
