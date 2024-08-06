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
import ConfirmCloseDialog from '@/components/custom/confirm-close-dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TimelineUpdateForm from './timeline-update-form'

export default function NewTimelineUpdateButton({
  applicationId,
}: {
  applicationId: string
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
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="sm:w-32">
              <DialogTrigger asChild>
                <DialogTrigger asChild>
                  <span className="flex h-full w-full items-center justify-center">
                    <PlusIcon size="20" />
                  </span>
                </DialogTrigger>
              </DialogTrigger>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add a TimelineUpdate</TooltipContent>
        </Tooltip>
        <DialogContent onEscapeKeyDown={onExit} onInteractOutside={onExit}>
          <DialogHeader>
            <DialogTitle>New Timeline Update</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Fill out the form to log your new timeline update
          </DialogDescription>
          <TimelineUpdateForm
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
