import { db } from '@/lib/db'
import { contactTimelineUpdates } from '@/drizzle/schema'
import { DbOrTx } from '@/types/drizzle'
import { z } from 'zod'
import { ContactTimelineUpdateSchema } from '@/schemas'
import { eq } from 'drizzle-orm'

export const editContactTimelineUpdateById = async (
  contactTimelineUpdateId: string,
  data: z.infer<typeof ContactTimelineUpdateSchema>,
  tx: DbOrTx = db,
) => {
  return await tx
    .update(contactTimelineUpdates)
    .set({
      ...data,
    })
    .where(eq(contactTimelineUpdates.id, contactTimelineUpdateId))
}
