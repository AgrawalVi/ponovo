'use client'

import { useState } from 'react'
import { DataTableWrapper } from '../ui/custom/data-table/data-table-wrapper'
import { dbContact, dbJobApplication } from '@/types'
import { contactTableColumns } from './columns'
import { dataTableApplicationStatusOptions } from '@/data'
import NewApplicationButton from '../forms/new-application/new-application-button'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'
import SavedJobPostsSheet from './saved-contact/saved-contact-sheet'
import FullApplicationViewWrapper from './full-contact-panel/full-contact-view-wrapper'
import NewContactButton from './interactions/contact/new-contact-button'

export default function ContactsTable({ data }: { data: dbContact[] }) {
  const [activeRow, setActiveRow] = useState<dbContact>(data[0])

  return (
    <DataTableWrapper
      data={data}
      columns={contactTableColumns}
      singular="contact"
      plural="contacts"
      defaultSortingState={[{ id: 'name', desc: true }]}
      filterInformation={[
        {
          inputPlaceholder: 'Search Contacts...',
          columnId: 'name',
        },
      ]}
      showVisibilityControls={false}
      // facetedFilterInformation={{
      //   columnId: 'applicationStatus',
      //   title: 'Application Status',
      //   options: dataTableApplicationStatusOptions,
      // }}
      // activeRowInformation={{
      //   activeRow,
      //   setActiveRow,
      //   activeRowCard: (
      //     <FullApplicationViewWrapper applicationId={activeRow?.id} />
      //   ),
      // }}
      actionButton={
        <div className="flex justify-end gap-2">
          {/* <NewApplicationButton applicationSeasonId={applicationSeasonId}>
            <Button className="hidden xl:block">New Application</Button>
          </NewApplicationButton>
          <NewApplicationButton applicationSeasonId={applicationSeasonId}>
            <Button className="w-12 items-center xl:hidden" size="icon">
              <PlusIcon size={20} />
            </Button>
          </NewApplicationButton> */}
          <NewContactButton />
          {/* <SavedJobPostsSheet applicationSeasonId={applicationSeasonId} /> */}
        </div>
      }
    />
  )
}
