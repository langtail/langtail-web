'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initMixpanel, trackPageView } from '@/lib/analytics'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Initialize Mixpanel when the component mounts
    initMixpanel()
  }, [])

  useEffect(() => {
    // Track page views whenever the pathname changes
    if (pathname) {
      trackPageView(pathname)
    }
  }, [pathname])

  return <>{children}</>
}
