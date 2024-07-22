import 'server-only'

import { jobApplicationTimelineUpdates } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { and, eq } from 'drizzle-orm'

export const deleteTimelineUpdateByIdAndUserId = async (
  id: string,
  userId: string,
) => {
  try {
    await db
      .delete(jobApplicationTimelineUpdates)
      .where(
        and(
          eq(jobApplicationTimelineUpdates.id, id),
          eq(jobApplicationTimelineUpdates.userId, userId),
        ),
      )
  } catch (e) {
    console.error(e)
    return null
  }
  return true
}
