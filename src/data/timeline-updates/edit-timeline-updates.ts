import 'server-only'

import { db } from '@/lib/db'
import { jobApplicationTimelineUpdates } from '@/drizzle/schema'
import { statusEnum } from '@/types'
import { and, eq } from 'drizzle-orm'

export const editTimelineUpdateByIdAndUserId = async (
  id: string,
  userId: string,
  updateType: statusEnum,
  updateDate: Date,
  comments: string | undefined,
) => {
  const timelineUpdate = await db
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
  return timelineUpdate[0] ?? null
}
