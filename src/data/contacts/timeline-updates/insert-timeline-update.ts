import { contactTimelineUpdates } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { ContactTimelineUpdateSchema } from '@/schemas'
import { DbOrTx } from '@/types/drizzle'
import { z } from 'zod'

export const insertContactTimelineUpdate = async (
  contactId: string,
  data: z.infer<typeof ContactTimelineUpdateSchema>,
  tx: DbOrTx = db,
) => {
  return await tx.insert(contactTimelineUpdates).values({
    contactId,
    ...data,
  })
}
