import { dbJobApplicationTimelineUpdate } from '@/types'
import { format } from 'date-fns'
import TimelineUpdateBadge from '../general/timeline-update-badge'
import { Textarea } from '@/components/ui/textarea'

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
      {comments ? (
        <div className="space-y-1">
          <div className="pl-1 text-sm">Comments</div>
          <Textarea value={comments} className="disabled:opacity-80" disabled />
        </div>
      ) : (
        <div>No Comments Provided</div>
      )}
    </li>
  )
}
