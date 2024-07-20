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
import EditApplicationForm from './edit-application-form'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PencilIcon } from 'lucide-react'

interface EditApplicationButtonProps {
  application: dbJobApplication
  children: React.ReactNode
}

export default function EditApplicationButton({
  application,
  children,
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
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent onEscapeKeyDown={onExit} onInteractOutside={onExit}>
          <DialogHeader>
            <DialogTitle>New Application</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Fill out the form to log your new application
          </DialogDescription>
          <EditApplicationForm
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
