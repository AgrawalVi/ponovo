'use client'

import { useState } from 'react'
import { RowSelectionState } from '@tanstack/react-table'

import { DataTable, DataTableProps } from './data-table'

// To have a data table with a side panel, use the following type definition, and then create a custom component for each table
// that requires the side panel.
// To have a data table with row selection, you will also need to pass in rowSelection and setRowSelection props. Especially if you want to
// access those props elsewhere in the app.
export type DataTableWithSidePanelProps<TData, TValue> = Omit<
  DataTableProps<TData, TValue>,
  'activeRowInformation'
>

export function DataTableWrapper<TData, TValue>({
  ...props
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  return (
    <DataTable
      rowSelection={props.rowSelection ?? rowSelection}
      setRowSelection={props.setRowSelection ?? setRowSelection}
      {...props}
    />
  )
}
