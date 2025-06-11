import { contacts, contactTimelineUpdates } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { DbOrTx } from '@/types/drizzle'
import { eq } from 'drizzle-orm'

export const getContactTimelineUpdateWithContactByIdAndUserId = async (
  contactTimelineUpdateId: string,
  userId: string,
  tx: DbOrTx = db,
) => {
  return await tx.query.contactTimelineUpdates.findFirst({
    where: eq(contactTimelineUpdates.id, contactTimelineUpdateId),
    with: {
      contact: true,
    },
  })
}
