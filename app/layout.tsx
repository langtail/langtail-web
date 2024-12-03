import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { pressStart2P } from './fonts'
import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui/toaster'

import { assetPrefix } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Langtail - Break My Prompt!',
  description:
    'Test your prompt engineering skills against our ninja! Challenge yourself with our AI prompt engineering game and improve your skills.',
  keywords: [
    'prompt engineering',
    'AI',
    'language models',
    'LLM',
    'game',
    'challenge',
    'AI training',
  ],
  authors: [{ name: 'Langtail Team' }],
  openGraph: {
    title: 'Langtail - Break My Prompt!',
    description:
      'Test your prompt engineering skills against our ninja! Challenge yourself with our AI prompt engineering game and improve your skills.',
    url: 'https://langtail.com',
    siteName: 'Langtail',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${assetPrefix}/og.jpg`,
        width: 1200,
        height: 630,
        alt: 'Langtail - Break My Prompt!',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Langtail - Break My Prompt!',
    description:
      'Test your prompt engineering skills against our ninja! Challenge yourself with our AI prompt engineering game and improve your skills.',
    creator: '@langtail',
    images: [`${assetPrefix}/og.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={pressStart2P.variable}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
