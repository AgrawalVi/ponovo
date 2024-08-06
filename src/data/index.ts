import { DataTableFacetedFilterOption } from '@/types'
import {
  CheckCircle,
  CircleX,
  Contact,
  FileX,
  Handshake,
  PartyPopper,
  Send,
} from 'lucide-react'

export const dataTableApplicationStatusOptions: DataTableFacetedFilterOption[] =
  [
    {
      label: 'Applied',
      value: 'applied',
      icon: Send,
    },
    {
      label: 'Online Assessment Received',
      value: 'online-assessment-received',
      icon: CheckCircle,
    },
    {
      label: 'Online Assessment Completed',
      value: 'online-assessment-completed',
      icon: CheckCircle,
    },
    {
      label: 'Interview Scheduled',
      value: 'interview-scheduled',
      icon: CheckCircle,
    },
    {
      label: 'Interviewed',
      value: 'interviewed',
      icon: Contact,
    },
    {
      label: 'Rejected',
      value: 'rejected',
      icon: CircleX,
    },
    {
      label: 'Offer Received',
      value: 'offer-received',
      icon: PartyPopper,
    },
    {
      label: 'Offer Declined',
      value: 'offer-declined',
      icon: FileX,
    },
    {
      label: 'Offer Accepted',
      value: 'offer-accepted',
      icon: Handshake,
    },
  ]
