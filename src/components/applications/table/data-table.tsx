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
import FullApplicationView from './full-application-view'
import { dbJobApplication } from '@/types'

interface DataTableProps {
  columns: ColumnDef<dbJobApplication>[]
  data: dbJobApplication[]
  initialSelectedRowId?: number
}

export function ApplicationDataTable({
  columns,
  data,
  initialSelectedRowId,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
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

  useEffect(() => {}, [selectedRow])

  return (
    <div className="space-y-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Search Companies..."
            value={
              (table.getColumn('companyName')?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn('companyName')?.setFilterValue(event.target.value)
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
      <div className="rounded-md border">
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
                  className="cursor-pointer"
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
      <FullApplicationView applicationId={selectedRow?.id} />
    </div>
  )
}
