'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { dbContact, dbJobApplication, statusEnum } from '@/types'
import StatusBadge from './general/status-badge'
import { DataTableColumnHeader } from '../ui/custom/data-table/data-table-column-header'

export const contactTableColumns: ColumnDef<dbContact>[] = [
  {
    accessorKey: 'name',
    sortingFn: 'alphanumeric',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />
    },
  },
  {
    accessorKey: 'companyName',
    sortingFn: 'alphanumeric',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Company Name" />
    },
  },
  {
    accessorKey: 'jobTitle',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Job Title" />
    },
  },
  // {
  //   accessorKey: 'applicationStatus',
  //   header: ({ column }) => {
  //     return (
  //       <DataTableColumnHeader column={column} title="Application Status" />
  //     )
  //   },
  //   cell: ({ row }) => {
  //     const status = row.getValue('applicationStatus') as statusEnum
  //     return <StatusBadge status={status} />
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   accessorKey: 'dateApplied',
  //   sortingFn: 'datetime',
  //   header: ({ column }) => {
  //     return <DataTableColumnHeader column={column} title="Date Applied" />
  //   },
  //   cell: ({ row }) => {
  //     const date = row.getValue('dateApplied') as string
  //     return <p>{format(new Date(date), 'PPP')}</p>
  //   },
  // },
]
