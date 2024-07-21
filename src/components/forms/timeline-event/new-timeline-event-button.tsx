'use client'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useState } from 'react'
import NewApplicationTimelineEventForm from './new-timeline-event-form'
import ConfirmCloseDialog from '@/components/custom/confirm-close-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export default function NewApplicationTimelineEventButton({
  children,
  applicationId,
}: {
  children: React.ReactNode
  applicationId: number
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <DialogTrigger asChild>{children}</DialogTrigger>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Add a TimelineUpdate</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent onEscapeKeyDown={onExit} onInteractOutside={onExit}>
          <DialogHeader>
            <DialogTitle>New Timeline Update</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Fill out the form to log your new timeline update
          </DialogDescription>
          <NewApplicationTimelineEventForm
            setIsChanged={setIsChanged}
            setOpen={setMainOpen}
            applicationId={applicationId}
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
