'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { MobileNav } from './mobile-nav'
import { ProductMenu } from './product-menu'

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Product',
    children: [
      {
        name: 'Debug',
        description: 'Refine prompts and collaborate with your team',
        href: '/debug-prompts',
        icon: 'BugPlay',
      },
      {
        name: 'Test',
        description: 'Test prompts to ensure they work as expected',
        href: '/prompt-testing',
        icon: 'FlaskConical',
      },
      {
        name: 'Deploy',
        description: 'Deploy prompts as API endpoints',
        href: '/deploy-prompts',
        icon: 'RocketIcon',
      },
      {
        name: 'Observe',
        description: 'Keep an eye on the metrics you care about',
        href: '/monitor-llm',
        icon: 'BarChart',
      },
    ],
  },
  { name: 'Templates', href: '/templates' },
  { name: 'Blog', href: '/blog' },
  { name: 'Pricing', href: '/pricing' },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="pt-6">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <Link href="/">
            <Logo className="h-8 w-auto" theme="light" />
          </Link>

          <div className="hidden items-center justify-center gap-x-8 lg:flex">
            {navigation.map((item) => (
              <motion.span
                whileHover="hover"
                key={item.name}
                variants={{
                  hover: {},
                }}
              >
                {item.children ? (
                  <ProductMenu items={item.children} />
                ) : (
                  <Link
                    href={item.href}
                    className="group block text-sm font-semibold leading-6 text-gray-300 hover:text-white"
                  >
                    {item.name}
                    <motion.span
                      className={cn('block h-[2px] w-0 bg-indigo-400', {
                        'w-full': pathname === item.href,
                      })}
                      variants={{
                        hover: {
                          width: '100%',
                        },
                      }}
                    />
                  </Link>
                )}
              </motion.span>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button asChild>
              <Link href="https://app.langtail.com/sign-up">Sign up</Link>
            </Button>
          </div>

          <div className="ml-auto flex lg:hidden">
            <MobileNav items={navigation} />
          </div>
        </div>
      </div>
    </div>
  )
}
