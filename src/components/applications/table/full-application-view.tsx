'use client'

import { format } from 'date-fns'
import { api } from '@/trpc/react'

export default function FullApplicationView({
  applicationId,
}: {
  applicationId: number
}) {
  const response = api.timeLineUpdates.getAllByApplicationId.useQuery({
    id: applicationId,
  })

  if (!response.data) {
    return <div>Application not found</div>
  }

  return <div>{JSON.stringify(response.data)}</div>

  // return (
  //   <div>
  //     <h1>{jobApplicationWithTimelineUpdates.companyName}</h1>
  //     <p>{jobApplicationWithTimelineUpdates.jobTitle}</p>
  //     <p>{jobApplicationWithTimelineUpdates.applicationStatus}</p>
  //     <p>{jobApplicationWithTimelineUpdates.roleType}</p>
  //     <p>
  //       {format(new Date(jobApplicationWithTimelineUpdates.dateApplied), 'PPP')}
  //     </p>
  //     <p>{jobApplicationWithTimelineUpdates.url}</p>
  //     {jobApplicationWithTimelineUpdates.jobApplicationTimelineUpdates.length >
  //       0 && (
  //       <ul>
  //         {jobApplicationWithTimelineUpdates.jobApplicationTimelineUpdates.map(
  //           (timelineUpdate) => (
  //             <li key={timelineUpdate.id}>
  //               {timelineUpdate.timeLineUpdate} at{' '}
  //               {format(
  //                 new Date(timelineUpdate.timelineUpdateReceivedAt),
  //                 'PPP',
  //               )}
  //               {timelineUpdate.comments && <p>{timelineUpdate.comments}</p>}
  //               {timelineUpdate.timeLineUpdate}
  //             </li>
  //           ),
  //         )}
  //       </ul>
  //     )}
  //   </div>
  // )
}
