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
import EditTimelineUpdateForm from './edit-timeline-update-form'
import { PencilIcon } from 'lucide-react'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

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
        <TooltipProvider delayDuration={200}>
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
              Edit Application
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent onEscapeKeyDown={onExit} onInteractOutside={onExit}>
          <DialogHeader>
            <DialogTitle>New Application</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Fill out the form to log your new application
          </DialogDescription>
          <EditTimelineUpdateForm
            timelineUpdate={timelineUpdate}
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
