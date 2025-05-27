'use client'

import * as React from 'react'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronsUpDown, Plus } from 'lucide-react'

import { replaceApplicationSeasonId } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// import CreateOrganizationFormDialog from './auth/organizations/create-organization-form-dialog'
import { dbApplicationSeason } from '@/types'
import { Button } from '../ui/button'
import CreateApplicationSeasonFormDialog from './create-application-season-form-dialog'

export function ApplicationSeasonSelector({
  applicationSeasons,
}: {
  applicationSeasons: dbApplicationSeason[]
}) {
  const [createApplicationSeasonOpen, setCreateApplicationSeasonOpen] =
    useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const currentSeason = applicationSeasons.find(
    (season) => pathname.split('/')[2] === season.id,
  )

  return (
    <>
      <CreateApplicationSeasonFormDialog
        open={createApplicationSeasonOpen}
        setOpen={setCreateApplicationSeasonOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="w-72 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {currentSeason?.name}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          align="start"
          side={'bottom'}
          sideOffset={4}
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Application Seasons
          </DropdownMenuLabel>
          {applicationSeasons
            .filter((season) => season.id !== currentSeason?.id)
            .map((season) => (
              <DropdownMenuItem
                key={season.name}
                onClick={() =>
                  router.push(replaceApplicationSeasonId(pathname, season.id))
                }
                className="gap-2 p-2"
              >
                {season.name}
              </DropdownMenuItem>
            ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2 p-2"
            onClick={() => {
              setCreateApplicationSeasonOpen(true)
            }}
          >
            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
              <Plus className="size-4" />
            </div>
            <div className="font-medium text-muted-foreground">
              Create Application Season
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
