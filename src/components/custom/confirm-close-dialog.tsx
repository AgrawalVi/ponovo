'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

interface ConfirmCloseDialogProps {
  setMainOpen: (value: boolean) => void
  open: boolean
  setOpen: (value: boolean) => void
}

export default function ConfirmCloseDialog({
  open,
  setOpen,
  setMainOpen,
}: ConfirmCloseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to exit?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <VisuallyHidden.Root>
            This will exit the form and you will lose any unsaved changes.
          </VisuallyHidden.Root>
        </DialogDescription>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This will exit the form and you will lose any unsaved changes.
          </AlertDescription>
        </Alert>
        <DialogFooter className="gap-2">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            variant="destructive"
            onClick={() => {
              setOpen(false)
              setMainOpen(false)
            }}
          >
            Yes, Exit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
