'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: string
  className?: string
  language?: string
}

export function CodeBlock({
  children,
  className,
  language = 'typescript',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group bg-gray-950 p-4">
      <div className={cn('relative overflow-hidden rounded-lg', className)}>
        <button
          onClick={copy}
          className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-md z-10"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-gray-400" />
          )}
        </button>

        {language === 'text' ? (
          <pre className="text-sm text-gray-400 whitespace-pre-wrap min-h-[80px]">
            {children}
          </pre>
        ) : (
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '1rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(31, 41, 55, 0.5)',
            }}
          >
            {children}
          </SyntaxHighlighter>
        )}
      </div>
    </div>
  )
}
