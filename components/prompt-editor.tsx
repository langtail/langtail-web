'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Copy, Sword, ExternalLink } from 'lucide-react'
import { DiffProvider } from './plate-editor/diff-context'
import DiffPlateEditor from './plate-editor/DiffPlateEditor'
import useEditor from './plate-editor/useEditor'
import { useDiffContext } from './plate-editor/diff-context'
import { useToast } from '@/components/ui/use-toast'
import { getLangtailUrl } from '@/lib/open-in-langtail'
import Link from 'next/link'

interface PromptEditorProps {
  initialPrompt: string
  suggestedText?: string
}

interface DiffControlsProps {
  onAccept: () => void
  onReject: () => void
}

function DiffControls({ onAccept, onReject }: DiffControlsProps) {
  const { handleSuggestionAccepted, handleSuggestionRejected } =
    useDiffContext()

  const handleAccept = () => {
    handleSuggestionAccepted()
    onAccept()
  }

  const handleReject = () => {
    handleSuggestionRejected()
    onReject()
  }

  return (
    <div className="flex justify-end gap-2">
      <Button variant="outline" onClick={handleReject}>
        Reject Changes
      </Button>
      <Button onClick={handleAccept}>Accept Changes</Button>
    </div>
  )
}

export function PromptEditor({
  initialPrompt,
  suggestedText: externalSuggestedText,
}: PromptEditorProps) {
  const [prompt, setPrompt] = useState(initialPrompt)
  const [suggestedText, setSuggestedText] = useState<string>('')
  const { toast } = useToast()
  const editor = useEditor()

  useEffect(() => {
    if (externalSuggestedText) {
      setSuggestedText(externalSuggestedText)
    }
  }, [externalSuggestedText])

  const handleSuggestionAccepted = () => {
    setSuggestedText('')
  }

  const handleSuggestionRejected = () => {
    setSuggestedText('')
  }

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      toast({
        title: 'Copied!',
        description: 'Prompt copied to clipboard',
      })
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy prompt',
        variant: 'destructive',
      })
    }
  }, [prompt, toast])

  return (
    <Card className="p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold">Your Prompt</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-8 w-8"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
      <DiffProvider
        editor={editor}
        suggestedText={suggestedText || undefined}
        onSuggestionAccept={handleSuggestionAccepted}
        onSuggestionReject={handleSuggestionRejected}
      >
        <div className="flex-1 flex flex-col gap-3 h-full overflow-hidden">
          <div className="h-full overflow-auto bg-background p-3 rounded-lg border">
            <DiffPlateEditor
              value={prompt}
              className="flex-1 h-full mb-4"
              onTextChange={setPrompt}
              placeholder="Your prompt will appear here..."
            />
          </div>
          {suggestedText ? (
            <DiffControls
              onAccept={handleSuggestionAccepted}
              onReject={handleSuggestionRejected}
            />
          ) : (
            <div className="flex justify-between gap-2">
              <Link href={getLangtailUrl(prompt)} target="_blank">
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Open in Langtail
                </Button>
              </Link>

              <Link href={`/prompt-ninja?prompt=${encodeURIComponent(prompt)}`}>
                <Button variant="outline" className="gap-2">
                  <Sword className="h-4 w-4" />
                  Test Against Ninja
                </Button>
              </Link>
            </div>
          )}
        </div>
      </DiffProvider>
    </Card>
  )
}
