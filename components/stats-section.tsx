import { ChallengeResult } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { WhiteNinjaSprite } from './white-ninja-sprite'
import { CTASection } from './cta-section'
import { Trophy, Target, Handshake } from 'lucide-react'

interface StatsProps {
  results: ChallengeResult[]
  prompt: string
}

export function StatsSection({ results, prompt }: StatsProps) {
  if (!results.length) return null

  const wins = results.filter((r) => r.status === 'win').length
  const losses = results.filter((r) => r.status === 'lose').length
  const ties = results.filter((r) => r.status === 'tie').length

  return (
    <Card className="p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="flex items-center gap-3 p-4 bg-green-500/10 rounded-lg">
          <Trophy className="w-5 h-5 text-green-500" />
          <div>
            <div className="text-sm text-muted-foreground">Wins</div>
            <div className="text-2xl font-bold text-green-500">{wins}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-red-500/10 rounded-lg">
          <Target className="w-5 h-5 text-red-500" />
          <div>
            <div className="text-sm text-muted-foreground">Losses</div>
            <div className="text-2xl font-bold text-red-500">{losses}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-yellow-500/10 rounded-lg">
          <Handshake className="w-5 h-5 text-yellow-500" />
          <div>
            <div className="text-sm text-muted-foreground">Ties</div>
            <div className="text-2xl font-bold text-yellow-500">{ties}</div>
          </div>
        </div>
      </div>

      {wins === results.length && (
        <div className="border-t pt-8 mb-8">
          <div className="text-center mb-8">
            <h3 className="pixel-font text-2xl text-primary mb-2">
              🎉 Perfect Score!
            </h3>
            <p className="text-muted-foreground">
              Incredible! Your prompt withstood all of our ninja&apos;s attacks.
              You&apos;re a natural at prompt engineering!
            </p>
          </div>
          <CTASection />
        </div>
      )}

      {losses > 0 && (
        <div className="border-t pt-8">
          <WhiteNinjaSprite prompt={prompt} results={results} />
        </div>
      )}
    </Card>
  )
}
