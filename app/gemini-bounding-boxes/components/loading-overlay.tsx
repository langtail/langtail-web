'use client'

import { Loader2 } from 'lucide-react'

export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Detecting objects...</p>
      </div>
    </div>
  )
}