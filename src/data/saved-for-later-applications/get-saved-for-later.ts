import { savedJobApplications } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'

export const getAllSavedForLaterByUserId = async (userId: string) => {
  let savedForLater
  try {
    savedForLater = await db
      .select()
      .from(savedJobApplications)
      .where(eq(savedJobApplications.userId, userId))
  } catch (e) {
    console.error(e)
    return null
  }
  return savedForLater
}
