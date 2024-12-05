'use client'

import { Logo } from '@/components/logo'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center">
            <Link href="/">
              <Logo theme={'light'} className="h-8 w-auto" />
            </Link>
          </div>
          <a
            href="https://langtail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            Test LLM apps faster with Langtail
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </nav>
  )
}
