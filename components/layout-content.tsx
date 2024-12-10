'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPromptPage = pathname?.includes('/prompt-')

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col',
        !isPromptPage && 'bg-gray-900',
        isPromptPage ? 'font-pixel' : 'font-sans'
      )}
    >
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  )
}
