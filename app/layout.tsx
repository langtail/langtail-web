import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { pressStart2P, inter } from './fonts'
import { Toaster } from '@/components/ui/toaster'
import { LayoutContent } from '@/components/layout-content'
import { AnalyticsProvider } from '@/components/analytics-provider'

export const metadata: Metadata = {
  title: 'Langtail',
  description: 'Build faster and more predictable AI-powered apps',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${pressStart2P.variable} ${inter.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsProvider>
            <LayoutContent>{children}</LayoutContent>
            <Toaster />
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
