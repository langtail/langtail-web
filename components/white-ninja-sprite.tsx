'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { AssetImage } from './ui/asset-image'
import { Button } from './ui/button'
import { ArrowRight, Wand2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface WhiteNinjaSpriteProps {
  className?: string
  prompt?: string
  results?: any[]
}

export function WhiteNinjaSprite({
  className = '',
  prompt = '',
  results = [],
}: WhiteNinjaSpriteProps) {
  const [frame, setFrame] = useState(0)
  const frames = ['A', 'B', 'C']
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((current) => (current + 1) % frames.length)
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className={cn('relative w-32 h-32', className)}>
        <AssetImage
          src={`/images/white-ninja/standing${frames[frame]}.png`}
          alt="White ninja animation"
          className="w-full h-full object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="absolute inset-0 animate-pulse bg-primary/10 rounded-full blur-xl" />
      </div>
      <div className="text-center space-y-4">
        <h4 className="pixel-font text-lg text-primary">
          Need help improving your prompt?
        </h4>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Let me teach you advanced techniques to make your prompts more robust!
        </p>
        <Button
          className="pixel-font group"
          onClick={() => {
            sessionStorage.setItem('improve_prompt', prompt)
            sessionStorage.setItem('improve_results', JSON.stringify(results))
            router.push('/prompt-improver')
          }}
        >
          Let me help you
          <Wand2 className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
