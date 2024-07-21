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
import { useEffect, useState } from 'react'
import { DataTableFacetedFilter } from '@/components/ui/data-table-faceted-filter'
import { dataTableApplicationStatusOptions } from '@/data'
import { DataTablePagination } from '@/components/ui/data-table-pagination'
import NewApplicationButton from '@/components/forms/new-application/new-application-button'
import FullApplicationView from '../full-application-panel/full-application-view'
import { dbJobApplication } from '@/types'
import { cn } from '@/lib/utils'

interface DataTableProps {
  columns: ColumnDef<dbJobApplication>[]
  data: dbJobApplication[]
  initialSelectedRowId?: string
}

export function ApplicationDataTable({
  columns,
  data,
  initialSelectedRowId,
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

  useEffect(() => {
    console.log('sorting state', sorting)
  }, [sorting])

  return (
    <div className="flex space-x-4 p-5">
      <div className="col-span-2 flex-1 space-y-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <Input
              placeholder="Search Companies..."
              value={
                (table.getColumn('companyName')?.getFilterValue() as string) ??
                ''
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
          <div>
            <NewApplicationButton>
              <Button>New Application</Button>
            </NewApplicationButton>
          </div>
        </div>
        <div className="rounded-md border 2xl:w-[60rem]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
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
      <FullApplicationView applicationId={selectedRow?.id} />
    </div>
  )
}
