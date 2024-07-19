'use client'

import { ColumnDef } from '@tanstack/react-table'
import { dbJobApplication } from '@/types'

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
  },
  {
    accessorKey: 'dateApplied',
    header: 'Date Applied',
  },
]
