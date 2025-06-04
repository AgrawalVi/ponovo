import { contacts } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'

export const getAllContactsByUserId = async (userId: string) => {
  return await db.query.contacts.findMany({
    where: eq(contacts.userId, userId),
  })
}
