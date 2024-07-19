import { DataTableFacetedFilterOption } from '@/types'
import {
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
