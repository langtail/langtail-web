'use client'

import { ChevronDown } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'

interface ProductMenuItem {
  name: string
  description: string
  href: string
  icon: keyof typeof Icons
}

interface ProductMenuProps {
  items: ProductMenuItem[]
}

export function ProductMenu({ items }: ProductMenuProps) {
  return (
    <Popover>
      <PopoverTrigger className="flex flex-col items-center gap-x-1 text-sm font-semibold leading-6">
        <span className="flex flex-row items-center gap-x-1 text-gray-300 hover:text-white">
          Product
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className={cn('block h-[2px] w-0 bg-indigo-400')} />
      </PopoverTrigger>

      <PopoverContent
        className="w-screen max-w-md overflow-hidden rounded-2xl bg-gray-950 p-0 shadow-lg ring-1 ring-gray-900/5"
        align="start"
        sideOffset={20}
      >
        <div className="p-2">
          {items.map((item) => {
            const Icon = Icons[item.icon]
            return (
              <div
                key={item.name}
                className="group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-900"
              >
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg border bg-gray-900 group-hover:border-gray-700 group-hover:bg-gray-800">
                  <Icon
                    className="h-5 w-5 text-gray-300 group-hover:text-white"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-auto">
                  <Link
                    href={item.href}
                    className="block font-semibold text-white"
                  >
                    {item.name}
                    <span className="absolute inset-0" />
                  </Link>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}