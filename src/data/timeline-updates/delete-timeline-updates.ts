import 'server-only'

import { jobApplicationTimelineUpdates } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { and, eq } from 'drizzle-orm'
import { DbOrTx } from '@/types/drizzle'

export const deleteTimelineUpdateByIdAndUserId = async (
  id: string,
  userId: string,
  tx: DbOrTx = db,
) => {
  await tx
    .delete(jobApplicationTimelineUpdates)
    .where(
      and(
        eq(jobApplicationTimelineUpdates.id, id),
        eq(jobApplicationTimelineUpdates.userId, userId),
      ),
    )
}
