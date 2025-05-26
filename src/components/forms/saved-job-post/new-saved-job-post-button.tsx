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
import SavedJobPostForm from './saved-job-post-form'
import { roleTypeEnum } from '@/types'
import { useCurrentPreferences } from '@/components/hooks/use-current-preferences'

export default function NewSavedJobPostButton({
  children,
  applicationSeasonId,
}: {
  children: React.ReactNode
  applicationSeasonId: string
}) {
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
            <DialogTitle>New Saved Job Post</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Fill out the form to save a job posting for later
          </DialogDescription>
          <SavedJobPostForm
            setIsChanged={setIsChanged}
            setOpen={setMainOpen}
            roleType={preferences.preferredJobType ?? 'full-time'}
            editing={false}
            applicationSeasonId={applicationSeasonId}
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
