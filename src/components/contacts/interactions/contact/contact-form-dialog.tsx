'use client'

import DialogFormWrapper from '@/components/ui/custom/dialog-form-wrapper'
import { Dialog } from '@/components/ui/dialog'
import { dbContact, dbCreateContactType } from '@/types'
import { useState } from 'react'
import ContactForm from './contact-form'

type ContactFormDialogPropsEditing = {
  editing: true
  contact: dbContact
  activateButton: React.ReactNode
}

type ContactFormDialogPropsNotEditing = {
  editing: false
  contact?: dbCreateContactType
  activateButton: React.ReactNode
}

type ContactFormDialogProps =
  | ContactFormDialogPropsEditing
  | ContactFormDialogPropsNotEditing

export default function ContactFormDialog({
  editing,
  contact,
  activateButton,
}: ContactFormDialogProps) {
  const [isChanged, setIsChanged] = useState(false)
  const [open, setOpen] = useState(false)

  return (
    <DialogFormWrapper
      title={editing ? 'Edit Contact' : 'New Contact'}
      description={editing ? 'Edit the contact details' : 'Add a new contact'}
      isChanged={isChanged}
      mainOpen={open}
      setMainOpen={setOpen}
      form={
        editing ? (
          <ContactForm
            contact={contact}
            setIsChanged={setIsChanged}
            setOpen={setOpen}
            editing={true}
          />
        ) : (
          <ContactForm
            contact={contact}
            setIsChanged={setIsChanged}
            setOpen={setOpen}
            editing={false}
          />
        )
      }
      activateButton={activateButton}
    />
  )
}
