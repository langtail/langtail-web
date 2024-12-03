'use client'

import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Bomb,
  HandshakeIcon,
  Maximize2,
  Minimize2,
} from 'lucide-react'
import { ChallengeResult } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface ChallengeTableProps {
  results: ChallengeResult[]
}

export function ChallengeTable({ results }: ChallengeTableProps) {
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [expandedContent, setExpandedContent] = useState<number[]>([])

  // Auto-expand first row on mount
  useEffect(() => {
    if (results.length > 0) {
      setExpandedRows([results[0].id])
    }
  }, [results])

  const toggleRow = (id: number) => {
    setExpandedRows((current) =>
      current.includes(id)
        ? current.filter((rowId) => rowId !== id)
        : [...current, id]
    )
  }

  const toggleContent = (id: number) => {
    setExpandedContent((current) =>
      current.includes(id)
        ? current.filter((rowId) => rowId !== id)
        : [...current, id]
    )
  }

  const getStatusColor = (status: 'win' | 'lose' | 'tie') => {
    switch (status) {
      case 'win':
        return 'text-green-500'
      case 'lose':
        return 'text-red-500'
      case 'tie':
        return 'text-yellow-500'
    }
  }

  const getStatusIcon = (status: 'win' | 'lose' | 'tie') => {
    switch (status) {
      case 'win':
        return <Sparkles className="h-4 w-4" />
      case 'lose':
        return <Bomb className="h-4 w-4" />
      case 'tie':
        return <HandshakeIcon className="h-4 w-4" />
    }
  }

  const getStatusEmoji = (status: 'win' | 'lose' | 'tie') => {
    switch (status) {
      case 'win':
        return '✨'
      case 'lose':
        return '💥'
      case 'tie':
        return '🤝'
    }
  }

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="w-[50px] pixel-font text-primary">
              #
            </TableHead>
            <TableHead className="w-[300px] pixel-font text-primary">
              Ninja&apos;s Attack
            </TableHead>
            <TableHead className="w-[300px] pixel-font text-primary">
              Response
            </TableHead>
            <TableHead className="w-[120px] pixel-font text-primary">
              Result
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => (
            <React.Fragment key={`row-${result.id}`}>
              <TableRow className="hover:bg-muted/50">
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => toggleRow(result.id)}
                  >
                    {expandedRows.includes(result.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
                <TableCell className="font-mono">{result.id}</TableCell>
                <TableCell className="font-mono max-w-[300px]">
                  <div className="flex items-start gap-2">
                    <div
                      className={cn(
                        'transition-all duration-300',
                        expandedContent.includes(result.id)
                          ? 'whitespace-pre-wrap'
                          : 'truncate'
                      )}
                    >
                      {result.attack}
                    </div>
                    {result.attack.length > 70 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 shrink-0"
                        onClick={() => toggleContent(result.id)}
                      >
                        {expandedContent.includes(result.id) ? (
                          <Minimize2 className="h-3 w-3" />
                        ) : (
                          <Maximize2 className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-mono max-w-[300px]">
                  <div className="flex items-start gap-2">
                    <div
                      className={cn(
                        'transition-all duration-300',
                        expandedContent.includes(result.id)
                          ? 'whitespace-pre-wrap'
                          : 'truncate'
                      )}
                    >
                      {result.response}
                    </div>
                    {result.response.length > 100 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 shrink-0"
                        onClick={() => toggleContent(result.id)}
                      >
                        {expandedContent.includes(result.id) ? (
                          <Minimize2 className="h-3 w-3" />
                        ) : (
                          <Maximize2 className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'pixel-font inline-flex items-center gap-2',
                      getStatusColor(result.status)
                    )}
                  >
                    {getStatusEmoji(result.status)}{' '}
                    {result.status.toUpperCase()}
                  </span>
                </TableCell>
              </TableRow>
              {expandedRows.includes(result.id) && (
                <TableRow key={`expanded-${result.id}`}>
                  <TableCell
                    colSpan={5}
                    className="bg-muted/30 animate-accordion-down"
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'mt-0.5',
                            getStatusColor(result.status)
                          )}
                        >
                          {getStatusIcon(result.status)}
                        </div>
                        <div className="space-y-2">
                          <h4 className="pixel-font text-sm">Analysis</h4>
                          <p className="text-sm text-muted-foreground">
                            {result.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
