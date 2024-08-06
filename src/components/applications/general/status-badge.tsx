import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { statusEnum } from '@/types'

export default function StatusBadge({
  status,
  className,
}: {
  status: statusEnum
  className?: string
}) {
  switch (status) {
    case 'applied':
      return (
        <Badge className={cn('h-fit', className)} variant="secondary">
          Applied
        </Badge>
      )
    case 'online-assessment-received':
      return (
        <Badge className={cn('h-fit', className)} variant="accent">
          Online Assessment Received
        </Badge>
      )
    case 'interview-scheduled':
      return (
        <Badge className={cn('h-fit', className)} variant="accent">
          Interview Scheduled
        </Badge>
      )
    case 'interviewed':
      return (
        <Badge className={cn('h-fit', className)} variant="accent">
          Interviewed
        </Badge>
      )
    case 'online-assessment-completed':
      return (
        <Badge className={cn('h-fit', className)} variant="accent">
          Online Assessment Completed
        </Badge>
      )
    case 'rejected':
      return (
        <Badge className={cn('h-fit', className)} variant="destructive">
          Rejected
        </Badge>
      )
    case 'offer-received':
      return (
        <Badge className={cn('h-fit', className)} variant="default">
          Offer Received
        </Badge>
      )
    case 'offer-declined':
      return (
        <Badge className={cn('h-fit', className)} variant="destructive">
          Offer Declined
        </Badge>
      )
    case 'offer-accepted':
      return (
        <Badge className={cn('h-fit', className)} variant="default">
          Offer Accepted
        </Badge>
      )
  }
}
