import { DataTableFacetedFilterOption } from '@/types'
import {
  BookCheck,
  BookText,
  CalendarCheck,
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
      label: 'OA Received',
      value: 'online-assessment-received',
      icon: BookText,
    },
    {
      label: 'OA Completed',
      value: 'online-assessment-completed',
      icon: BookCheck,
    },
    {
      label: 'Interview Scheduled',
      value: 'interview-scheduled',
      icon: CalendarCheck,
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
