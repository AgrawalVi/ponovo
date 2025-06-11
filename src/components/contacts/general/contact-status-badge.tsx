import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ContactStatusEnum } from '@/types'

export default function ContactStatusBadge({
  status,
  className,
}: {
  status: ContactStatusEnum
  className?: string
}) {
  switch (status) {
    case 'contacted':
      return (
        <Badge className={cn('h-fit', className)} variant="secondary">
          Contacted
        </Badge>
      )
    case 'followed-up':
      return (
        <Badge className={cn('h-fit', className)} variant="secondary">
          Followed Up
        </Badge>
      )
    case 'replied':
      return (
        <Badge className={cn('h-fit', className)} variant="accent">
          Replied
        </Badge>
      )
    case 'meeting-scheduled':
      return (
        <Badge className={cn('h-fit', className)} variant="accent">
          Meeting Scheduled
        </Badge>
      )
    case 'meeting-completed':
      return (
        <Badge className={cn('h-fit', className)} variant="accent">
          Meeting Completed
        </Badge>
      )
    case 'referral-requested':
      return (
        <Badge className={cn('h-fit', className)} variant="accent">
          Referral Requested
        </Badge>
      )
    case 'referral-received':
      return (
        <Badge className={cn('h-fit', className)} variant="default">
          Referral Received
        </Badge>
      )
    case 'referral-promised':
      return (
        <Badge className={cn('h-fit', className)} variant="default">
          Referral Promised
        </Badge>
      )
    case 'ghosted':
      return (
        <Badge className={cn('h-fit', className)} variant="destructive">
          Ghosted
        </Badge>
      )
  }
}
