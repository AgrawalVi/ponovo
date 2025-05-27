import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '../alert'
import { Button } from '../button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../dialog'

export default function WarningDialog({
  title,
  description,
  alertTitle,
  alertDescription,
  confirmText,
  open,
  setOpen,
  onCancel,
  onLeave,
}: {
  title: string
  description: string
  alertTitle: string
  alertDescription: string
  confirmText: string
  open: boolean
  setOpen: (open: boolean) => void
  onCancel: () => void
  onLeave: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <VisuallyHidden.Root>
            <DialogDescription>{description}</DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{alertTitle}</AlertTitle>
          <AlertDescription>{alertDescription}</AlertDescription>
        </Alert>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onLeave}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
