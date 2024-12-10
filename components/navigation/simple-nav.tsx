'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { ArrowRight } from 'lucide-react'

export function SimpleNav() {
  const pathname = usePathname()

  return (
    <div className="pt-6 font-sans">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex items-center">
          <Link href="/">
            <Logo className="h-8 w-auto" theme="light" />
          </Link>

          <div className="ml-auto flex items-center gap-x-8">
            <a
              href="https://langtail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors group"
            >
              Test LLM apps faster with Langtail
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
