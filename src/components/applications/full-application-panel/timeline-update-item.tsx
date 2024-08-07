import { dbJobApplicationTimelineUpdate } from '@/types'
import { format } from 'date-fns'
import StatusBadge from '../general/status-badge'
import { Textarea } from '@/components/ui/textarea'
import DeleteTimelineUpdateButton from '@/components/forms/timeline-updates/delete-timeline-update-button'
import EditTimelineUpdateButton from '@/components/forms/timeline-updates/edit-timeline-update-button'

export default function TimelineUpdateItem({
  timelineUpdate,
}: {
  timelineUpdate: dbJobApplicationTimelineUpdate
}) {
  const { timeLineUpdate, timelineUpdateReceivedAt, comments } = timelineUpdate

  return (
    <li className="space-y-4 py-6">
      <div className="flex items-center justify-between gap-2">
        <StatusBadge status={timeLineUpdate} />
        <div className="text-end">
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
        <EditTimelineUpdateButton timelineUpdate={timelineUpdate} />
        <DeleteTimelineUpdateButton
          applicationId={timelineUpdate.jobApplicationId}
          timelineUpdateId={timelineUpdate.id}
        />
      </div>
    </li>
  )
}
