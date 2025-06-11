'use client'

import DialogFormWrapper from '@/components/ui/custom/dialog-form-wrapper'
import { dbContactTimelineUpdate } from '@/types'
import { useState } from 'react'
import ContactTimelineUpdateForm from './contact-timeline-update-form'

type ContactTimelineUpdateFormDialogPropsEditing = {
  editing: true
  timelineUpdate: dbContactTimelineUpdate
  activateButton: React.ReactNode
  contactId: string
}

type ContactTimelineUpdateFormDialogPropsNotEditing = {
  editing: false
  timelineUpdate?: dbContactTimelineUpdate
  activateButton: React.ReactNode
  contactId: string
}

type ContactTimelineUpdateFormDialogProps =
  | ContactTimelineUpdateFormDialogPropsEditing
  | ContactTimelineUpdateFormDialogPropsNotEditing

export default function ContactTimelineUpdateFormDialog({
  editing,
  timelineUpdate,
  activateButton,
  contactId,
}: ContactTimelineUpdateFormDialogProps) {
  const [isChanged, setIsChanged] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <DialogFormWrapper
      title={
        editing ? 'Edit Contact Timeline Update' : 'New Contact Timeline Update'
      }
      description={
        editing
          ? 'Edit the contact timeline update'
          : 'Add a new contact timeline update'
      }
      isChanged={isChanged}
      mainOpen={open}
      setMainOpen={setOpen}
      form={
        editing ? (
          <ContactTimelineUpdateForm
            timelineUpdate={timelineUpdate}
            setIsChanged={setIsChanged}
            setOpen={setOpen}
            editing={true}
            contactId={contactId}
          />
        ) : (
          <ContactTimelineUpdateForm
            timelineUpdate={timelineUpdate}
            setIsChanged={setIsChanged}
            setOpen={setOpen}
            editing={false}
            contactId={contactId}
          />
        )
      }
      activateButton={activateButton}
    />
  )
}
