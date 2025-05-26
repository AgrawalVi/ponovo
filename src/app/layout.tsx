import type { Metadata } from 'next'
import { Maven_Pro } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Analytics } from '@vercel/analytics/react'
import { Toaster as Sonner } from '@/components/ui/sonner'

const maven = Maven_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-maven',
})

export const metadata: Metadata = {
  title: 'Ponovo',
  description: 'Make Job Application Season a Breeze',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${maven.className}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={200}>
            <main>{children}</main>
            <Analytics />
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
