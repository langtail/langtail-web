'use client'

import { useEffect, useState } from 'react'
import { WhiteNinjaChat } from '@/components/white-ninja-chat'
import { PromptEditor } from '@/components/prompt-editor'
import { ChallengeResult } from '@/lib/types'
import { AssetImage } from '@/components/ui/asset-image'

export function PromptImproverContent() {
  const [didLoad, setDidLoad] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [results, setResults] = useState<ChallengeResult[]>([])
  const [suggestedPrompt, setSuggestedPrompt] = useState<string>('')

  useEffect(() => {
    const storedPrompt = sessionStorage.getItem('improve_prompt')
    const storedResults = sessionStorage.getItem('improve_results')

    if (storedPrompt) {
      setPrompt(storedPrompt)
    }

    if (storedResults) {
      setResults(JSON.parse(storedResults))
    }

    setDidLoad(true)
  }, [])

  return (
    <div className="p-4 md:p-8 mt-5 ninja">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center gap-8 mb-8">
            <h1 className="pixel-font text-2xl md:text-4xl text-primary">
              IMPROVE YOUR PROMPT!
            </h1>
            <div className="relative">
              <div className="w-32 h-32">
                <AssetImage
                  src="/images/white-ninja/standingA.png"
                  alt="White ninja"
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="absolute inset-0 animate-pulse bg-primary/10 rounded-full blur-xl" />
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mb-6 pixel-font text-sm">
            Let me help you make your prompt more robust and effective!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 flex flex-col h-[50vh] min-h-[500px]">
            <WhiteNinjaChat
              prompt={prompt}
              results={results}
              onSuggestPrompt={setSuggestedPrompt}
            />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col h-[50vh] min-h-[500px] font-sans">
            {didLoad && (
              <PromptEditor
                initialPrompt={prompt}
                suggestedText={suggestedPrompt}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
