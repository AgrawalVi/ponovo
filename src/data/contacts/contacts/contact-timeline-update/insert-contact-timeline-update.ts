import { contactTimelineUpdates } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { ContactTimelineUpdateSchema } from '@/schemas'
import { DbOrTx } from '@/types/drizzle'
import z from 'zod'

export const insertContactTimelineUpdate = async (
  contactId: string,
  data: z.infer<typeof ContactTimelineUpdateSchema>,
  tx: DbOrTx = db,
) => {
  const contact = await tx
    .insert(contactTimelineUpdates)
    .values({
      contactId,
      ...data,
    })
    .returning()

  return contact[0]
}
