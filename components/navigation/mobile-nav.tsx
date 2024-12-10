'use client'

import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface NavigationItem {
  name: string
  href: string
  children?: Array<{
    name: string
    description: string
    href: string
  }>
}

interface MobileNavProps {
  items: NavigationItem[]
}

export function MobileNav({ items }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-gray-950 p-6">
        <SheetHeader>
          <SheetTitle>
            <Logo className="h-8 w-auto" theme="light" />
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          <div className="flex flex-col space-y-4">
            {items.map((item) =>
              item.children ? (
                <Accordion
                  key={item.name}
                  type="single"
                  collapsible
                  className="w-full"
                >
                  <AccordionItem value={item.name}>
                    <AccordionTrigger className="text-sm font-semibold text-gray-300 hover:text-white">
                      {item.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="text-sm text-gray-400 hover:text-white"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold text-gray-300 hover:text-white"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}