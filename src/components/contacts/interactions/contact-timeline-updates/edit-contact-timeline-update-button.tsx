'use client'

import { Button } from '@/components/ui/button'
import { dbContactTimelineUpdate } from '@/types'
import { PencilIcon } from 'lucide-react'
import ContactTimelineUpdateFormDialog from './contact-form-dialog'

interface EditContactTimelineUpdateButtonProps {
  timelineUpdate: dbContactTimelineUpdate
}

export default function EditContactTimelineUpdateButton({
  timelineUpdate,
}: EditContactTimelineUpdateButtonProps) {
  return (
    <ContactTimelineUpdateFormDialog
      editing={true}
      contactId={timelineUpdate.contactId}
      timelineUpdate={timelineUpdate}
      activateButton={
        <Button
          variant="ghost"
          className="size-8 border border-dashed"
          size="icon"
        >
          <PencilIcon size="16" />
        </Button>
      }
    />
  )
}
