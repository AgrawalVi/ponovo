'use client'

import { type LucideIcon } from 'lucide-react'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const pathname = usePathname()
  const parts = pathname.split('/') // ['', 'dashboard', '123'] ['', 'dashboard', '123', 'applications]

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Link href={`/dashboard/${parts[2]}${item.url}`} key={item.title}>
            <SidebarMenuButton
              className={cn(
                'text-muted-foreground transition-colors hover:bg-inherit hover:text-foreground active:bg-inherit active:text-foreground',
                pathname === item.url &&
                  'bg-accent text-accent-foreground hover:bg-accent',
              )}
              tooltip={item.title}
            >
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </Link>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
