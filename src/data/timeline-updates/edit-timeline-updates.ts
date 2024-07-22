import 'server-only'

import { db } from '@/lib/db'
import { jobApplicationTimelineUpdates } from '@/drizzle/schema'
import { timeLineUpdateEnum } from '@/types'
import { and, eq } from 'drizzle-orm'

export const editTimelineUpdateByIdAndUserId = async (
  id: string,
  userId: string,
  updateType: timeLineUpdateEnum,
  updateDate: Date,
  comments: string | undefined,
) => {
  let timelineUpdate
  try {
    timelineUpdate = await db
      .update(jobApplicationTimelineUpdates)
      .set({
        timeLineUpdate: updateType,
        timelineUpdateReceivedAt: updateDate,
        comments: comments,
      })
      .where(
        and(
          eq(jobApplicationTimelineUpdates.id, id),
          eq(jobApplicationTimelineUpdates.userId, userId),
        ),
      )
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
