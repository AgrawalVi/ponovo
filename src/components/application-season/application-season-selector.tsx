'use client'

import * as React from 'react'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronsUpDown, Plus, Settings } from 'lucide-react'

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
import { Badge } from '../ui/badge'
import ManageApplicationSeasons from './manage-application-seasons'
import { api } from '@/trpc/react'
import { Skeleton } from '../ui/skeleton'

export function ApplicationSeasonSelector() {
  const [createApplicationSeasonOpen, setCreateApplicationSeasonOpen] =
    useState(false)
  const [manageApplicationSeasonsOpen, setManageApplicationSeasonsOpen] =
    useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const { data: applicationSeasons, isPending } =
    api.applicationSeasons.getAllApplicationSeasons.useQuery()

  if (isPending) {
    return <Skeleton className="h-10 w-72" />
  }

  const currentSeason = applicationSeasons?.find(
    (season) => pathname.split('/')[2] === season.id,
  )

  if (pathname.includes('preferences')) {
    return null
  }

  return (
    <>
      <CreateApplicationSeasonFormDialog
        open={createApplicationSeasonOpen}
        setOpen={setCreateApplicationSeasonOpen}
      />
      <ManageApplicationSeasons
        applicationSeasons={applicationSeasons ?? []}
        open={manageApplicationSeasonsOpen}
        setOpen={setManageApplicationSeasonsOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="w-72 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex w-full items-center justify-between text-sm leading-tight">
              <span className="truncate font-medium">
                {currentSeason?.name}
              </span>
              {currentSeason?.active && <Badge className="mr-2">Active</Badge>}
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
          {applicationSeasons &&
            applicationSeasons
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
                  {season.active && <Badge className="ml-2">Active</Badge>}
                </DropdownMenuItem>
              ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="gap-2 p-2"
            onClick={() => {
              setManageApplicationSeasonsOpen(true)
            }}
          >
            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
              <Settings className="size-4" />
            </div>
            <div className="font-medium text-muted-foreground">
              Manage Application Seasons
            </div>
          </DropdownMenuItem>
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
