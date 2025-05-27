'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import WarningDialog from './warning-dialog'

type DialogFormWrapperProps = {
  activateButton?: React.ReactNode
  form: React.ReactNode
  title: string
  description: string
  mainOpen: boolean
  setMainOpen: (open: boolean) => void
  isChanged: boolean
  alertDialogTitle?: string
  alertDialogDescription?: string
  alertText?: string
  alertDescription?: string
}

export default function DialogFormWrapper({
  activateButton,
  form,
  title,
  description,
  mainOpen,
  setMainOpen,
  isChanged,
  alertDialogTitle = 'Be Careful!',
  alertDialogDescription = 'You are about to leave the form. All unsaved changes will be lost.',
  alertText = 'Hold on there!',
  alertDescription = 'You are about to leave the form. All unsaved changes will be lost.',
}: DialogFormWrapperProps) {
  const [warningOpen, setWarningOpen] = useState(false)

  const handleExit = (
    e:
      | CustomEvent<{
          originalEvent: PointerEvent
        }>
      | KeyboardEvent,
  ) => {
    if (isChanged) {
      e.preventDefault()
      setWarningOpen(true)
    } else {
      setMainOpen(false)
    }
  }

  return (
    <>
      <Dialog open={mainOpen} onOpenChange={setMainOpen}>
        {activateButton && (
          <DialogTrigger asChild>{activateButton}</DialogTrigger>
        )}
        <DialogContent
          onPointerDownOutside={handleExit}
          onEscapeKeyDown={handleExit}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {form}
        </DialogContent>
      </Dialog>
      <WarningDialog
        title={alertDialogTitle}
        description={alertDialogDescription}
        alertTitle={alertText}
        alertDescription={alertDescription}
        open={warningOpen}
        setOpen={setWarningOpen}
        onCancel={() => setWarningOpen(false)}
        onLeave={() => {
          setWarningOpen(false)
          setMainOpen(false)
        }}
        confirmText="Leave"
      />
    </>
  )
}
