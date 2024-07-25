'use client'

import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip'
import {
  Home,
  LayoutDashboard,
  PanelLeft,
  ScrollText,
  Settings,
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ClerkLoading, SignedIn, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Skeleton } from '@/components/ui/skeleton'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Applications',
    href: '/dashboard/applications',
    icon: ScrollText,
  },
  {
    name: 'Preferences',
    href: '/dashboard/preferences',
    icon: Settings,
  },
]

export function SidebarNav() {
  const pathname = usePathname()
  return (
    <>
      <aside className="sticky inset-y-0 left-0 z-10 hidden w-20 flex-col border-r bg-background sm:flex">
        <nav className="flex h-full flex-col items-center justify-between gap-4 px-2 py-5">
          <div>
            <Link
              href="/"
              className="group mb-4 flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Home className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Ponovo</span>
            </Link>
            {navItems.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'my-4 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                      item.href === pathname &&
                        'bg-accent text-accent-foreground',
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.name}</TooltipContent>
              </Tooltip>
            ))}
          </div>
          <div className="flex w-full flex-col items-center space-y-4">
            <ModeToggle side="right" className="size-8 rounded-full" />
            <ClerkLoading>
              <Skeleton className="h-7 w-7 rounded-full" />
            </ClerkLoading>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </aside>
    </>
  )
}

export function MobileNav() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <VisuallyHidden>
          <SheetTitle>Navbar</SheetTitle>
          <SheetDescription>
            This is the navigation menu for the application
          </SheetDescription>
        </VisuallyHidden>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className={cn(
                'group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base',
              )}
            >
              <Home className="h-5 w-5 transition-all group-hover:scale-110" />
              <span className="sr-only">Ponovo</span>
            </Link>
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={cn(
                  'flex items-center gap-4 px-2.5 py-1 text-muted-foreground hover:text-foreground',
                  pathname === item.href &&
                    'rounded-lg bg-accent/50 text-accent-foreground',
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex items-center space-x-2">
        <ClerkLoading>
          <Skeleton className="h-7 w-7 rounded-full" />
        </ClerkLoading>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle className="size-8 rounded-full" />
      </div>
    </header>
  )
}
