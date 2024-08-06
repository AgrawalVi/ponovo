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
import ConfirmCloseDialog from '@/components/custom/confirm-close-dialog'
import { dbJobApplicationTimelineUpdate } from '@/types'
import { PencilIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import TimelineUpdateForm from './timeline-update-form'

interface EditApplicationButtonProps {
  timelineUpdate: dbJobApplicationTimelineUpdate
}

export default function EditTimelineUpdateButton({
  timelineUpdate,
}: EditApplicationButtonProps) {
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
            <Button
              variant="ghost"
              className="border border-dashed"
              size="icon"
            >
              <DialogTrigger asChild>
                <span className="flex h-full w-full items-center justify-center">
                  <PencilIcon size="20" />
                </span>
              </DialogTrigger>
            </Button>
          </TooltipTrigger>
          <TooltipContent align="center" avoidCollisions={false}>
            Edit Timeline Update
          </TooltipContent>
        </Tooltip>
        <DialogContent onEscapeKeyDown={onExit} onInteractOutside={onExit}>
          <DialogHeader>
            <DialogTitle>Edit Timeline Update</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Fill out the form to edit your timeline update
          </DialogDescription>
          <TimelineUpdateForm
            timelineUpdate={timelineUpdate}
            setIsChanged={setIsChanged}
            setOpen={setMainOpen}
            applicationId={timelineUpdate.jobApplicationId}
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
