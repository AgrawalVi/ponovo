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
import { dbJobApplication } from '@/types'
import { PencilIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import ApplicationForm from './application-form'

interface EditApplicationButtonProps {
  application: dbJobApplication
}

export default function EditApplicationButton({
  application,
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
            Edit Application
          </TooltipContent>
        </Tooltip>
        <DialogContent onEscapeKeyDown={onExit} onInteractOutside={onExit}>
          <DialogHeader>
            <DialogTitle>Edit Application</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Fill out the form to edit your application
          </DialogDescription>
          <ApplicationForm
            application={application}
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
