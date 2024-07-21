import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { applicationStatusEnum } from '@/types'

export default function ApplicationStatusBadge({
  status,
  className,
}: {
  status: applicationStatusEnum
  className?: string
}) {
  switch (status) {
    case 'applied':
      return (
        <Badge className={cn('h-fit', className)} variant="secondary">
          Applied
        </Badge>
      )
    case 'interviewed':
      return (
        <Badge className={cn('h-fit', className)} variant="accent">
          Interviewed
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
