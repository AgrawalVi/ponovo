import { contactTimelineUpdates } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { DbOrTx } from '@/types/drizzle'
import { and, eq } from 'drizzle-orm'

export const deleteContactTimelineUpdateById = async (
  contactTimelineUpdateId: string,
  tx: DbOrTx = db,
) => {
  await tx
    .delete(contactTimelineUpdates)
    .where(eq(contactTimelineUpdates.id, contactTimelineUpdateId))
}
