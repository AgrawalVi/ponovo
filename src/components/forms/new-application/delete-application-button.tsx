'use client'

import { deleteApplication } from '@/actions/applications/delete-application'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Button, buttonVariants } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { AlertCircle, Trash2Icon } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

export default function DeleteApplicationButton({
  applicationId,
}: {
  applicationId: string
}) {
  const { toast } = useToast()

  const handleDelete = async () => {
    const response = await deleteApplication(applicationId)
    if (response.success) {
      toast({ title: 'Application deleted successfully' })
    } else {
      toast({
        title: 'Something went wrong!',
        description: response.error,
        variant: 'destructive',
      })
    }
  }

  return (
    <Dialog>
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="border border-dashed hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
            >
              <DialogTrigger asChild>
                <span className="flex h-full w-full items-center justify-center">
                  <Trash2Icon size="20" />
                </span>
              </DialogTrigger>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete Application</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">
            Are you sure you want to delete the application?
          </DialogTitle>
          <DialogDescription>
            <VisuallyHidden.Root>
              Are you sure you want to delete the application?
            </VisuallyHidden.Root>
          </DialogDescription>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This will delete the selected job application and you will lose
              all data associated with it.
            </AlertDescription>
          </Alert>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className={cn(buttonVariants({ variant: 'outline' }))}>
            Cancel
          </DialogClose>
          <DialogClose
            className={cn(buttonVariants({ variant: 'destructive' }))}
            onClick={handleDelete}
          >
            Delete
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
