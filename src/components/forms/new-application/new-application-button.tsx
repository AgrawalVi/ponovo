'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useState } from 'react'
import NewApplicationForm from './new-application-form'
import ConfirmCloseDialog from '@/components/custom/confirm-close-dialog'

export default function NewApplicationButton({
  children,
}: {
  children: React.ReactNode
}) {
  const [mainOpen, setMainOpen] = useState(false)
  const [confirmExitOpen, setConfirmExitOpen] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  const onExit = (event: any) => {
    event.preventDefault() // prevent the default form closure
    if (isChanged) {
      setConfirmExitOpen(true)
    } else {
      setMainOpen(false)
    }
  }

  return (
    <>
      <Dialog open={mainOpen} onOpenChange={setMainOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent onEscapeKeyDown={onExit} onInteractOutside={onExit}>
          <DialogHeader>
            <DialogTitle>New Application</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Fill out the form to log your new application
          </DialogDescription>
          <NewApplicationForm
            setIsChanged={setIsChanged}
            setOpen={setMainOpen}
          />
        </DialogContent>
      </Dialog>

      <ConfirmCloseDialog
        open={confirmExitOpen}
        setOpen={setConfirmExitOpen}
        setMainOpen={setMainOpen}
      />
    </>
  )
}
