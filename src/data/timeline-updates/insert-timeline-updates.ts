import 'server-only'

import { jobApplicationTimelineUpdates } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { timeLineUpdateEnum } from '@/types'

export const insertTimelineUpdate = async (
  jobApplicationId: string,
  userId: string,
  timeLineUpdate: timeLineUpdateEnum,
  timelineUpdateReceivedAt: Date,
  comments: string | undefined,
) => {
  let timelineUpdate
  try {
    timelineUpdate = await db
      .insert(jobApplicationTimelineUpdates)
      .values({
        jobApplicationId,
        timeLineUpdate,
        timelineUpdateReceivedAt,
        comments,
        userId,
      })
      .returning()
  } catch (e) {
    console.error(e)
    return null
  }
  if (timelineUpdate.length !== 1) {
    return null
  }
  return timelineUpdate[0]
}
