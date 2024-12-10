'use client'

import { usePathname } from 'next/navigation'
import { MainNav } from './navigation/main-nav'
import { SimpleNav } from './navigation/simple-nav'

export function Navbar() {
  const pathname = usePathname()

  // Use simple nav for prompt-ninja and prompt-improver pages
  if (pathname?.includes('/prompt-')) {
    return <SimpleNav />
  }

  // Use main nav for all other pages
  return <MainNav />
}