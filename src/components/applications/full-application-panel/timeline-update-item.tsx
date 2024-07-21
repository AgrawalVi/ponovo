import { dbJobApplicationTimelineUpdate } from '@/types'
import { format } from 'date-fns'
import TimelineUpdateBadge from '../general/timeline-update-badge'
import { Textarea } from '@/components/ui/textarea'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TimelineUpdateItem({
  timelineUpdate,
}: {
  timelineUpdate: dbJobApplicationTimelineUpdate
}) {
  const { timeLineUpdate, timelineUpdateReceivedAt, comments } = timelineUpdate

  return (
    <li className="space-y-4 py-6">
      <div className="flex items-center justify-between">
        <TimelineUpdateBadge timelineUpdate={timeLineUpdate} />
        <div className="flex justify-center">
          {format(new Date(timelineUpdateReceivedAt), 'PPP')}
        </div>
      </div>
      {comments && (
        <div className="space-y-1">
          <div className="pl-1 text-sm">Comments</div>
          <Textarea value={comments} className="disabled:opacity-80" disabled />
        </div>
      )}
      <div className="flex w-full justify-end space-x-2">
        <Button variant="ghost" className="border border-dashed" size="icon">
          <PencilIcon size="20" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="border border-dashed hover:border-destructive/50 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2Icon size="20" />
        </Button>
      </div>
    </li>
  )
}