import { contacts } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { DbOrTx } from '@/types/drizzle'
import { and, eq } from 'drizzle-orm'

export const getAllContactsByUserId = async (userId: string) => {
  return await db.query.contacts.findMany({
    where: eq(contacts.userId, userId),
  })
}

export const getContactWithTimelineUpdatesDescendingByIdAndUserId = async (
  id: string,
  userId: string,
  tx: DbOrTx = db,
) => {
  return await tx.query.contacts.findFirst({
    where: and(eq(contacts.id, id), eq(contacts.userId, userId)),
    with: {
      contactTimelineUpdates: {
        orderBy: (contactTimelineUpdates, { desc }) => [
          desc(contactTimelineUpdates.updateDate),
        ],
      },
    },
  })
}
