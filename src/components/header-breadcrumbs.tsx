'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default function HeaderBreadcrumbs() {
  const pathname = usePathname()
  const pages = pathname.split('/').slice(1)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pages.map((page, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                href={`${pathname
                  .split('/')
                  .slice(0, index + 2)
                  .join('/')}`}
                className={
                  'capitalize ' +
                  (index === pages.length - 1 ? 'text-foreground' : '')
                }
              >
                {page.replace(/-/g, ' ')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden last:hidden md:block" />
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
