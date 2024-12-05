'use client'

import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export function CTASection() {
  return (
    <Card className="p-8 bg-card/50 border-2 border-primary/20">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="space-y-2">
          <h3 className="pixel-font text-lg font-semibold mb-2">
            Congratulations, Prompt Master!
          </h3>
          <p className="text-muted-foreground max-w-[42rem] mx-auto">
            Your prompting skills are impressive! Want to maintain this level of
            excellence? Try Langtail to create stable and powerful prompts every
            time.
          </p>
        </div>
        <Link href="https://langtail.com">
          <Button className="pixel-font group" size="lg">
            Try Langtail Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}
