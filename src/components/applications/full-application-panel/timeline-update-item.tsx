import { dbJobApplicationTimelineUpdate } from '@/types'
import { format } from 'date-fns'
import StatusBadge from '../general/status-badge'
import DeleteTimelineUpdateButton from '@/components/forms/timeline-updates/delete-timeline-update-button'
import EditTimelineUpdateButton from '@/components/forms/timeline-updates/edit-timeline-update-button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { MessageSquare } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'

export default function TimelineUpdateItem({
  timelineUpdate,
}: {
  timelineUpdate: dbJobApplicationTimelineUpdate
}) {
  const { timeLineUpdate, timelineUpdateReceivedAt, comments } = timelineUpdate

  return (
    <li className="flex items-center justify-between rounded-md bg-muted/50 p-2 transition-colors hover:bg-muted">
      <div className="flex min-w-0 flex-nowrap items-center gap-2">
        <StatusBadge status={timeLineUpdate} />
        <span className="whitespace-nowrap text-sm text-muted-foreground">
          {format(new Date(timelineUpdateReceivedAt), 'MMM d')}
        </span>
        {comments && (
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MessageSquare className="size-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Textarea
                  disabled
                  value={comments}
                  className="h-32 disabled:cursor-auto disabled:opacity-100"
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <EditTimelineUpdateButton timelineUpdate={timelineUpdate} />
        <DeleteTimelineUpdateButton
          applicationId={timelineUpdate.jobApplicationId}
          timelineUpdateId={timelineUpdate.id}
        />
      </div>
    </li>
  )
}
