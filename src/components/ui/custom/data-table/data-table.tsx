'use client'

import React, { useEffect, useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  Updater,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { cn } from '@/lib/utils'
import { DataTableViewOptions } from './data-table-column-toggle'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTablePagination } from './data-table-pagination'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type DataTableFilterInformation = {
  inputPlaceholder: string
  columnId: string
}

type DataTableFacetedFilterInformation = {
  columnId: string
  title: string
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

type DataTableActiveRowInformation<TData> = {
  activeRow: TData
  setActiveRow: (updater: Updater<TData>) => void
  activeRowCard: React.ReactNode
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  singular: string
  plural: string
  defaultSortingState?: SortingState
  filterInformation?: DataTableFilterInformation[]
  showVisibilityControls?: boolean
  actionButton?: React.ReactNode
  rowSelection?: RowSelectionState
  setRowSelection?: (updater: Updater<RowSelectionState>) => void
  facetedFilterInformation?: DataTableFacetedFilterInformation
  activeRowInformation?: DataTableActiveRowInformation<TData>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  singular,
  plural,
  defaultSortingState,
  filterInformation,
  showVisibilityControls = false,
  actionButton,
  rowSelection,
  setRowSelection,
  facetedFilterInformation,
  activeRowInformation,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(
    defaultSortingState ?? [],
  )
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [currentFilterInformation, setCurrentFilterInformation] = useState<
    DataTableFilterInformation | undefined
  >(filterInformation?.[0])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // if there's activeRowInformation, then we need to set the activeRow to the first row in the table on initial render
  useEffect(() => {
    if (activeRowInformation) {
      activeRowInformation.setActiveRow(table.getRowModel().rows?.[0]?.original)
    }
  }, [])

  return (
    <div className="w-full p-2">
      <div className="flex max-w-[1440px] flex-col items-center gap-2">
        <div className="flex w-full items-end justify-between gap-2">
          <div className="flex flex-1 flex-col-reverse items-start gap-2 md:flex-row">
            {filterInformation && (
              <div className="flex w-full max-w-md gap-2 md:w-fit md:max-w-none">
                {filterInformation.length > 1 && (
                  <Select
                    value={currentFilterInformation?.columnId}
                    onValueChange={(value) => {
                      setCurrentFilterInformation(
                        filterInformation?.find(
                          (filter) => filter.columnId === value,
                        ),
                      )
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={currentFilterInformation?.inputPlaceholder
                          .split(' ')
                          .slice(1)
                          .join(' ')}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {filterInformation.map((filter) => (
                        <SelectItem
                          key={filter.columnId}
                          value={filter.columnId}
                        >
                          {filter.inputPlaceholder
                            .split(' ')
                            .slice(1)
                            .join(' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {currentFilterInformation && (
                  <Input
                    placeholder={currentFilterInformation.inputPlaceholder}
                    value={
                      (table
                        .getColumn(currentFilterInformation.columnId)
                        ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                      table
                        .getColumn(currentFilterInformation.columnId)
                        ?.setFilterValue(event.target.value)
                    }
                    className="w-full md:w-[300px]"
                  />
                )}
              </div>
            )}
            {facetedFilterInformation && (
              <DataTableFacetedFilter
                column={table.getColumn(facetedFilterInformation.columnId)}
                title={facetedFilterInformation.title}
                options={facetedFilterInformation.options}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            {showVisibilityControls && <DataTableViewOptions table={table} />}
            {actionButton}
          </div>
        </div>
        <div
          className={
            activeRowInformation
              ? 'grid w-full grid-cols-1 gap-4 lg:grid lg:grid-cols-3'
              : 'w-full'
          }
        >
          <div
            className={cn(
              'grid gap-2',
              activeRowInformation && 'order-1 h-fit lg:order-1 lg:col-span-2',
            )}
          >
            <div className="overflow-x-auto rounded-md border">
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
                          'text-center',
                          activeRowInformation &&
                            activeRowInformation.activeRow === row.original &&
                            'bg-muted',
                          activeRowInformation && 'cursor-pointer',
                        )}
                        onClick={() => {
                          activeRowInformation?.setActiveRow(row.original)
                        }}
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
            <DataTablePagination
              table={table}
              singular={singular}
              plural={plural}
            />
          </div>
          {activeRowInformation && (
            <div className="order-2 w-full lg:order-2 lg:col-span-1">
              {activeRowInformation.activeRowCard}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
