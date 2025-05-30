'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter'
import { dataTableApplicationStatusOptions } from '@/data'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import NewApplicationButton from '@/components/forms/new-application/new-application-button'
import FullApplicationView from '../full-application-panel/full-application-view'
import { dbJobApplication } from '@/types'
import { cn } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'
import SavedJobPostsSheet from '@/components/applications/saved-job-posts/saved-job-posts-sheet'

interface DataTableProps {
  columns: ColumnDef<dbJobApplication>[]
  data: dbJobApplication[]
  initialSelectedRowId?: string
  applicationSeasonId: string
}

export function ApplicationDataTable({
  columns,
  data,
  initialSelectedRowId,
  applicationSeasonId,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'companyName', desc: false },
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const [selectedRow, setSelectedRow] = useState<dbJobApplication | null>(
    () => {
      if (initialSelectedRowId) {
        const row = table
          .getRowModel()
          .rows?.find((row) => row.original.id === initialSelectedRowId)
        if (row) {
          return row.original
        }
      }
      return table.getRowModel().rows?.[0]?.original ?? null
    },
  )

  return (
    <div className="flex w-full justify-center">
      <div className="overflow-x-auto">
        <div className="flex flex-col items-center gap-2 p-5 xl:max-w-[1440px]">
          <div className="flex w-full items-end justify-between gap-2">
            <div className="flex flex-1 flex-col-reverse items-start gap-2 md:flex-row">
              <Input
                placeholder="Search Companies..."
                value={
                  (table
                    .getColumn('companyName')
                    ?.getFilterValue() as string) ?? ''
                }
                onChange={(event) =>
                  table
                    .getColumn('companyName')
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              {table.getColumn('applicationStatus') && (
                <DataTableFacetedFilter
                  column={table.getColumn('applicationStatus')}
                  title="Application Status"
                  options={dataTableApplicationStatusOptions}
                />
              )}
            </div>
            <div className="flex justify-end gap-2">
              <NewApplicationButton applicationSeasonId={applicationSeasonId}>
                <Button className="hidden xl:block">New Application</Button>
              </NewApplicationButton>
              <NewApplicationButton applicationSeasonId={applicationSeasonId}>
                <Button className="w-12 items-center xl:hidden" size="icon">
                  <PlusIcon size={20} />
                </Button>
              </NewApplicationButton>
              <SavedJobPostsSheet applicationSeasonId={applicationSeasonId} />
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-4 overflow-x-auto lg:flex-row lg:items-start lg:justify-center">
            <div className="flex w-full flex-col gap-2">
              <div className="rounded-md border">
                <Table className="w-full">
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow
                        key={headerGroup.id}
                        className="hover:bg-background hover:dark:bg-background"
                      >
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                            </TableHead>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                          className={cn(
                            'cursor-pointer',
                            row.original.id === selectedRow?.id && 'bg-muted',
                          )}
                          onClick={() => setSelectedRow(row.original)}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <DataTablePagination table={table} />
            </div>
            <div className="flex flex-col gap-2 lg:w-[30rem] xl:w-[35rem]">
              <FullApplicationView applicationId={selectedRow?.id || ''} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
