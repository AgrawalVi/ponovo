'use client'

import { ColumnDef } from '@tanstack/react-table'
import { dbJobApplication } from '@/types'
import { format } from 'date-fns'
import { applicationStatusEnum } from '@/types'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { MessageCirclePlus, PencilIcon, Trash2Icon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

export const applicationTableColumns: ColumnDef<dbJobApplication>[] = [
  {
    accessorKey: 'companyName',
    header: 'Company Name',
  },
  {
    accessorKey: 'jobTitle',
    header: 'Job Title',
  },
  {
    accessorKey: 'applicationStatus',
    header: 'Application Status',
    cell: ({ row }) => {
      const status = row.getValue('applicationStatus') as applicationStatusEnum
      return <div className="text-center">{status}</div>
    },
  },
  {
    accessorKey: 'dateApplied',
    header: 'Date Applied',
    cell: ({ row }) => {
      const date = row.getValue('dateApplied') as string
      return format(new Date(date), 'P')
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const jobApplication = row.original

      return (
        <div className="space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MessageCirclePlus size="20" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add Timeline Event</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PencilIcon size="20" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Edit Information</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2Icon size="20" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete Application</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )
    },
  },
]
