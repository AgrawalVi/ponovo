import { DataTableFacetedFilterOption } from '@/types'
import {
  BookCheck,
  BookText,
  CalendarCheck,
  CircleX,
  Contact,
  FileX,
  Ghost,
  Handshake,
  PartyPopper,
  RefreshCw,
  Send,
  Reply,
  HelpCircle,
  Gift,
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

export const dataTableContactStatusOptions: DataTableFacetedFilterOption[] = [
  {
    label: 'Contacted',
    value: 'contacted',
    icon: Send,
  },
  {
    label: 'Replied',
    value: 'replied',
    icon: Reply,
  },
  {
    label: 'Meeting Scheduled',
    value: 'meeting-scheduled',
    icon: CalendarCheck,
  },
  {
    label: 'Meeting Completed',
    value: 'meeting-completed',
    icon: Contact,
  },
  {
    label: 'Followed Up',
    value: 'followed-up',
    icon: RefreshCw,
  },
  {
    label: 'Referral Requested',
    value: 'referral-requested',
    icon: HelpCircle,
  },
  {
    label: 'Referral Promised',
    value: 'referral-promised',
    icon: Handshake,
  },
  {
    label: 'Referral Received',
    value: 'referral-received',
    icon: Gift,
  },
  {
    label: 'Ghosted',
    value: 'ghosted',
    icon: Ghost,
  },
]
