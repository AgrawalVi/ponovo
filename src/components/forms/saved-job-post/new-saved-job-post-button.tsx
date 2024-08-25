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
import { useUser } from '@clerk/nextjs'
import { roleTypeEnum } from '@/types'

export default function NewSavedJobPostButton({
  children,
}: {
  children: React.ReactNode
}) {
  const [mainOpen, setMainOpen] = useState(false)
  const [confirmExitOpen, setConfirmExitOpen] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  const { user, isLoaded } = useUser()

  const onExit = (event: any) => {
    event.preventDefault() // prevent the default form closure
    if (isChanged) {
      setConfirmExitOpen(true)
    } else {
      setMainOpen(false)
    }
  }

  if (!user || !isLoaded) {
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
            roleType={
              user?.publicMetadata?.roleType as roleTypeEnum | undefined
            }
            editing={false}
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
