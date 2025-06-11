import 'server-only'

import { db } from '@/lib/db'
import { contacts } from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'

export const deleteContactByIdAndUserId = async (
  id: string,
  userId: string,
) => {
  await db
    .delete(contacts)
    .where(and(eq(contacts.id, id), eq(contacts.userId, userId)))
}
