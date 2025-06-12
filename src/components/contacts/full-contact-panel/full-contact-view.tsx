'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { api } from '@/trpc/react'
import FullApplicationSkeleton from '../../skeletons/full-application-view-skeleton'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import StatusBadge from '../general/contact-status-badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Check, Copy, Mail, MessageSquare } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import TimelineUpdateItem from './contact-timeline-update-item'
import NewContactTimelineUpdateButton from '../interactions/contact-timeline-updates/new-timeline-update-button'
import DeleteContactButton from '../interactions/contact/delete-contact-button'
import EditContactButton from '../interactions/contact/edit-contact-button'
import LinkedIn from '@/components/SVGs/linkedin-icon'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'

export default function FullContactView({ contactId }: { contactId: string }) {
  const [hasCopiedLinkedIn, setHasCopiedLinkedIn] = useState(false)
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopiedLinkedIn(false)
    }, 2000)
  }, [hasCopiedLinkedIn])

  useEffect(() => {
    setTimeout(() => {
      setHasCopiedEmail(false)
    }, 2000)
  }, [hasCopiedEmail])

  const query = api.contact.contactTimelineUpdates.getAllByContactId.useQuery({
    id: contactId,
  })

  if (query.isPending) {
    return <FullApplicationSkeleton />
  }

  if (!query.data) {
    if (query.error) {
      console.error(query.error)
      return <div>An error has occurred</div>
    }
    return <div>No contact found</div>
  }

  const {
    name,
    company,
    jobTitle,
    contactStatus,
    email,
    linkedInUrl,
    notes,
    createdAt,
  } = query.data

  const { contactTimelineUpdates, ...rest } = query.data

  return (
    <Card className="relative h-fit w-full">
      <CardHeader className="pb-[18px]">
        <StatusBadge
          className="absolute right-2 top-2"
          status={contactStatus}
        />
        <div className="flex items-center gap-2">
          <CardTitle className="capitalize">{name}</CardTitle>
          {notes && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MessageSquare size={18} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Textarea
                  disabled
                  value={notes}
                  className="h-32 disabled:cursor-auto disabled:opacity-100"
                />
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="pt-2 text-lg capitalize text-muted-foreground">
            {jobTitle} @ {company}
          </div>
        </div>
        <CardDescription className="flex justify-end">
          <span>{format(new Date(createdAt), 'PPP')}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator orientation="horizontal" />
        {contactTimelineUpdates.length > 0 && (
          <ul className="space-y-2 py-2">
            {contactTimelineUpdates.map((timelineUpdate) => (
              <TimelineUpdateItem
                key={timelineUpdate.id}
                timelineUpdate={timelineUpdate}
              />
            ))}
          </ul>
        )}
        <Separator orientation="horizontal" />
      </CardContent>
      <CardFooter>
        <div className="grid w-full grid-cols-3">
          <div className="flex gap-2 justify-self-start">
            {linkedInUrl && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="border border-dashed"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(linkedInUrl)
                      setHasCopiedLinkedIn(true)
                    }}
                  >
                    {hasCopiedLinkedIn ? (
                      <Check size="20" />
                    ) : (
                      <LinkedIn className="size-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy LinkedIn URL</TooltipContent>
              </Tooltip>
            )}
            {email && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="border border-dashed"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(email)
                      setHasCopiedEmail(true)
                    }}
                  >
                    {hasCopiedEmail ? (
                      <Check size="20" />
                    ) : (
                      <Mail className="size-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy Email</TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="flex justify-self-center">
            <NewContactTimelineUpdateButton contactId={contactId} />
          </div>
          <div className="flex space-x-2 justify-self-end">
            <EditContactButton contact={rest} />
            <DeleteContactButton contactId={contactId} />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
