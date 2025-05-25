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
import ApplicationForm from './application-form'
import { dbCreateApplicationType, roleTypeEnum } from '@/types'
import { useCurrentPreferences } from '@/components/hooks/use-current-preferences'

interface NewApplicationButtonProps {
  children: React.ReactNode
  application?: dbCreateApplicationType
  savedJobPostId?: string
}

export default function NewApplicationButton({
  children,
  application,
  savedJobPostId,
}: NewApplicationButtonProps) {
  const [mainOpen, setMainOpen] = useState(false)
  const [confirmExitOpen, setConfirmExitOpen] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  const { preferences, isLoading } = useCurrentPreferences()

  const onExit = (event: any) => {
    event.preventDefault() // prevent the default form closure
    if (isChanged) {
      setConfirmExitOpen(true)
    } else {
      setMainOpen(false)
    }
  }

  if (!preferences || isLoading) {
    return null
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
          <ApplicationForm
            setIsChanged={setIsChanged}
            setOpen={setMainOpen}
            editing={false}
            roleType={preferences.preferredJobType ?? 'full-time'}
            application={application}
            savedJobPostId={savedJobPostId}
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
