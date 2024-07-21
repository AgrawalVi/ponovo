'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { api } from '@/trpc/react'
import FullApplicationSkeleton from '../../skeletons/full-application-skeleton'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ApplicationStatusBadge from '../general/application-status-badge'
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import {
  Check,
  Copy,
  CopyCheck,
  Delete,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import TimelineUpdateItem from './timeline-update-item'
import NewApplicationTimelineEventButton from '@/components/forms/timeline-event/new-timeline-event-button'
import DeleteApplicationButton from '@/components/forms/new-application/delete-application-button'
import EditApplicationButton from '@/components/forms/new-application/edit-application-button'
import { dbJobApplication } from '@/types'

export default function FullApplicationView({
  applicationId,
}: {
  applicationId?: number
}) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  if (!applicationId) {
    return <div>No application selected</div>
  }

  const query = api.timeLineUpdates.getAllByApplicationId.useQuery({
    id: applicationId,
  })

  if (query.isPending) {
    return <FullApplicationSkeleton />
  }

  if (!query.data) {
    if (query.error) {
      console.error(query.error)
    }
    return <div>An error has occurred</div>
  }

  const {
    companyName,
    jobTitle,
    dateApplied,
    roleType,
    url,
    applicationStatus,
  } = query.data

  const { jobApplicationTimelineUpdates, ...rest } = query.data

  return (
    <Card className="relative h-fit w-[25rem]">
      <CardHeader>
        <ApplicationStatusBadge
          className="absolute right-4 top-4"
          status={applicationStatus}
        />
        <CardTitle>{companyName}</CardTitle>
        <div className="flex items-center justify-between">
          <div className="pt-2 text-lg text-muted-foreground">{jobTitle}</div>
        </div>
        <CardDescription className="flex justify-between">
          <span>{roleType}</span>
          <span>{format(new Date(dateApplied), 'PPP')}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator orientation="horizontal" />
        {jobApplicationTimelineUpdates.length > 0 && (
          <ul className="divide-y">
            {jobApplicationTimelineUpdates.map((timelineUpdate) => (
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
        <div className="grid grid-cols-3">
          <div className="flex justify-self-start">
            {url && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="border border-dashed"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard.writeText(url)
                        setHasCopied(true)
                      }}
                    >
                      {hasCopied ? <Check size="20" /> : <Copy size="20" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Copy Job Post URL</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex justify-self-center">
            <NewApplicationTimelineEventButton applicationId={applicationId}>
              <Button className="w-32">
                <PlusIcon size="20" />
              </Button>
            </NewApplicationTimelineEventButton>
          </div>
          <div className="flex space-x-2 justify-self-end">
            <EditApplicationButton application={rest}>
              <Button
                variant="ghost"
                className="border border-dashed"
                size="icon"
              >
                <PencilIcon size="20" />
              </Button>
            </EditApplicationButton>
            <DeleteApplicationButton applicationId={applicationId}>
              
            </DeleteApplicationButton>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
