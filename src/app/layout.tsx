import type { Metadata } from 'next'
import { Maven_Pro } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Analytics } from '@vercel/analytics/react'

const maven = Maven_Pro({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-maven',
})

export const metadata: Metadata = {
  title: 'Ponovo',
  description: 'Make Job Application Season a Breeze',
}

// TODO: Add maven pro for headers

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark],
      }}
    >
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
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
