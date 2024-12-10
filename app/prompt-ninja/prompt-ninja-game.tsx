'use client'

import { useState, useEffect } from 'react'
import { Sword, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { NinjaSprite } from '@/components/ninja-sprite'
import { PromptInput } from '@/components/prompt-input'
import { ChallengeTable } from '@/components/challenge-table'
import { WhiteNinjaSprite } from '@/components/white-ninja-sprite'
import { StatsSection } from '@/components/stats-section'
import type { ChallengeResult } from '@/lib/types'
import { useToast } from '@/components/ui/use-toast'
import { apiFetch } from '@/lib/api-utils'
import { generateMockChallenge } from '@/lib/mock-data'
import { useSearchParams } from 'next/navigation'

export function PromptNinjaGame() {
  const [prompt, setPrompt] = useState('')
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [ninjaState, setNinjaState] = useState<'idle' | 'attack' | 'run'>(
    'idle'
  )
  const [results, setResults] = useState<ChallengeResult[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const promptParam = searchParams.get('prompt')
    if (promptParam) {
      setPrompt(promptParam)
    }
  }, [searchParams])

  const handleStartGame = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    setNinjaState('run')
    setResults([])

    try {
      let data: ChallengeResult[]

      if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true') {
        // Simulate API delay in dev mode
        await new Promise((resolve) => setTimeout(resolve, 1000))
        data = generateMockChallenge(prompt)
      } else {
        const response = await apiFetch('/api/challenge', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        })

        if (!response.ok) {
          throw new Error('Failed to challenge prompt')
        }

        data = await response.json()
      }

      setNinjaState('attack')
      setResults(data)

      setTimeout(() => {
        setNinjaState('idle')
      }, 1000)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to challenge your prompt. Please try again.',
        variant: 'destructive',
      })
      setNinjaState('idle')
    } finally {
      setIsLoading(false)
    }
  }

  const getGameStatus = () => {
    if (!results.length) return null

    const wins = results.filter((r) => r.status === 'win').length
    const losses = results.filter((r) => r.status === 'lose').length
    const ties = results.filter((r) => r.status === 'tie').length

    return { wins, losses, ties }
  }

  const gameStatus = getGameStatus()

  return (
    <div className="p-4 md:p-8 mt-5 ninja">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center gap-8 mb-8">
            <h1 className="pixel-font text-2xl md:text-4xl text-primary">
              BREAK MY PROMPT!
            </h1>
            <div className="relative">
              <NinjaSprite state={ninjaState} className="transform-gpu" />
              {ninjaState === 'idle' && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-2 bg-black/20 rounded-full blur-sm animate-pulse" />
              )}
            </div>
          </div>
          <p className="text-muted-foreground mb-6 pixel-font text-sm">
            Can your prompt withstand the ninja&apos;s attempts to break it?
          </p>
        </div>

        <Card className="p-6 mb-8 bg-card border-2">
          <PromptInput
            value={prompt}
            onChange={setPrompt}
            disabled={isLoading}
          />
          <Button
            onClick={handleStartGame}
            disabled={!prompt.trim() || isLoading}
            className="w-full pixel-font"
            size="lg"
          >
            {isLoading ? (
              'Game in Progress...'
            ) : results.length > 0 ? (
              <div className="flex items-center gap-2">
                <span>
                  Score: {gameStatus?.wins}W {gameStatus?.losses}L{' '}
                  {gameStatus?.ties}T
                </span>
                <RotateCcw className="h-4 w-4 ml-2" />
                <span>Try Again?</span>
              </div>
            ) : (
              <>
                <Sword className="mr-2 h-4 w-4" />
                Challenge the Ninja!
              </>
            )}
          </Button>
        </Card>

        {results.length > 0 && (
          <StatsSection results={results} prompt={prompt} />
        )}

        {results.length > 0 && (
          <div className="space-y-8">
            <h3 className="pixel-font text-xl mb-4 text-center text-primary">
              Ninja&apos;s Challenge Results
            </h3>
            <ChallengeTable results={results} />
            {gameStatus && gameStatus.losses > 0 && (
              <WhiteNinjaSprite prompt={prompt} results={results} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
