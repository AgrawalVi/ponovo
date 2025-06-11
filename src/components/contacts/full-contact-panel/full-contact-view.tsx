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
import { Check, Copy } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import TimelineUpdateItem from './contact-timeline-update-item'
import NewContactTimelineUpdateButton from '../interactions/contact-timeline-updates/new-timeline-update-button'
import DeleteContactButton from '../interactions/contact/delete-contact-button'
import EditContactButton from '../interactions/contact/edit-contact-button'

export default function FullContactView({ contactId }: { contactId: string }) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

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
    phone,
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
        <CardTitle className="capitalize">{name}</CardTitle>
        <div className="flex items-center justify-between">
          <div className="pt-2 text-lg capitalize text-muted-foreground">
            {jobTitle} @ {company}
          </div>
        </div>
        <CardDescription className="flex justify-between">
          <span className="capitalize">{jobTitle}</span>
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
          <div className="flex justify-self-start">
            {linkedInUrl && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="border border-dashed"
                    size="icon"
                    onClick={() => {
                      navigator.clipboard.writeText(linkedInUrl)
                      setHasCopied(true)
                    }}
                  >
                    {hasCopied ? <Check size="20" /> : <Copy size="20" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy Job Post URL</TooltipContent>
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
