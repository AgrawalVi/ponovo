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
import { dbSavedJobPost } from '@/types'
import { PencilIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import SavedJobPostForm from './saved-job-post-form'

interface EditJobPostButtonProps {
  jobPost: dbSavedJobPost
}

export default function EditJobPostButton({ jobPost }: EditJobPostButtonProps) {
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
            Edit Saved Job Post
          </TooltipContent>
        </Tooltip>
        <DialogContent onEscapeKeyDown={onExit} onInteractOutside={onExit}>
          <DialogHeader>
            <DialogTitle>Edit Saved Job Post</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Fill out the form to edit your saved job post
          </DialogDescription>
          <SavedJobPostForm
            jobPost={jobPost}
            setIsChanged={setIsChanged}
            setOpen={setMainOpen}
            editing={true}
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
