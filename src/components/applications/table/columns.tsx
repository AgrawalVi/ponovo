'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { dbJobApplication, applicationStatusEnum } from '@/types'
import ApplicationStatusBadge from '../general/application-status-badge'

export const applicationTableColumns: ColumnDef<dbJobApplication>[] = [
  {
    accessorKey: 'companyName',
    sortingFn: 'alphanumeric',
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
    header: () => {
      return (
        <div className="flex justify-center">
          <span>Application Status</span>
        </div>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue('applicationStatus') as applicationStatusEnum
      return (
        <div className="flex w-full items-center justify-center text-center">
          <ApplicationStatusBadge status={status} />
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'dateApplied',
    sortingFn: 'datetime',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return (
        <div className="flex justify-center">
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
        </div>
      )
    },
    cell: ({ row }) => {
      const date = row.getValue('dateApplied') as string
      return (
        <div className="text-center">
          <p>{format(new Date(date), 'PPP')}</p>
        </div>
      )
    },
  },
]
