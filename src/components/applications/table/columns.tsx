'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import {
  MessageCirclePlus,
  PencilIcon,
  Trash2Icon,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
} from 'lucide-react'
import { dbJobApplication, applicationStatusEnum } from '@/types'

export const applicationTableColumns: ColumnDef<dbJobApplication>[] = [
  {
    accessorKey: 'companyName',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === 'asc')}
        >
          Company Name
          {isSorted ? (
            isSorted === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'dateApplied',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === 'asc')}
        >
          Date Applied
          {isSorted ? (
            isSorted === 'asc' ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue('dateApplied') as string
      return format(new Date(date), 'P')
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const jobApplication = row.original

      // TODO: Need to put edit, garbage, and copy link in a dropdownmeny and keep add timeline event in the same row
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
