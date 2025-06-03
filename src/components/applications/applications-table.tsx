'use client'

import { useState } from 'react'
import { DataTableWrapper } from '../ui/custom/data-table/data-table-wrapper'
import { dbJobApplication } from '@/types'
import FullApplicationView from './full-application-panel/full-application-view'
import { applicationTableColumns } from './columns'
import { dataTableApplicationStatusOptions } from '@/data'
import NewApplicationButton from '../forms/new-application/new-application-button'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import SavedJobPostsSheet from './saved-job-posts/saved-job-posts-sheet'

export default function ApplicationsTable({
  data,
  applicationSeasonId,
}: {
  data: dbJobApplication[]
  applicationSeasonId: string
}) {
  const [activeRow, setActiveRow] = useState<dbJobApplication>(data[0])

  return (
    <DataTableWrapper
      data={data}
      columns={applicationTableColumns}
      singular="application"
      plural="applications"
      defaultSortingState={[{ id: 'companyName', desc: true }]}
      filterInformation={[
        {
          inputPlaceholder: 'Search Companies...',
          columnId: 'companyName',
        },
      ]}
      showVisibilityControls={false}
      facetedFilterInformation={{
        columnId: 'applicationStatus',
        title: 'Application Status',
        options: dataTableApplicationStatusOptions,
      }}
      activeRowInformation={{
        activeRow,
        setActiveRow,
        activeRowCard: <FullApplicationView applicationId={activeRow?.id} />,
      }}
      actionButton={
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
      }
    />
  )
}
