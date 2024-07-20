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

export default function NewApplicationButton() {
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
        <DialogTrigger asChild>
          <Button>New Application</Button>
        </DialogTrigger>
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

      <Dialog open={confirmExitOpen} onOpenChange={setConfirmExitOpen}>
        <DialogContent className="w-[300px]">
          <DialogHeader>
            <DialogTitle>Are you sure you want to exit?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            This will exit the form and you will lose any unsaved changes.
          </DialogDescription>
          <div className="flex items-center justify-center gap-x-2">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setConfirmExitOpen(false)}
            >
              Go Back
            </Button>
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => {
                setConfirmExitOpen(false)
                setMainOpen(false)
              }}
            >
              Yes, Exit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
