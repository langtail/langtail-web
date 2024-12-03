'use client'

import { Logo } from '@/components/logo'
import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Logo theme={'light'} className="h-8 w-auto" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
