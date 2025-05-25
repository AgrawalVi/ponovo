import 'server-only'

import { jobApplicationTimelineUpdates } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { statusEnum } from '@/types'
import { DbOrTx } from '@/types/drizzle'

export const insertTimelineUpdate = async (
  jobApplicationId: string,
  userId: string,
  timeLineUpdate: statusEnum,
  timelineUpdateReceivedAt: Date,
  comments: string | undefined,
  tx: DbOrTx = db,
) => {
  const timelineUpdate = await tx
    .insert(jobApplicationTimelineUpdates)
    .values({
      jobApplicationId,
      timeLineUpdate,
      timelineUpdateReceivedAt,
      comments,
      userId,
    })
    .returning()

  return timelineUpdate[0] ?? null
}
