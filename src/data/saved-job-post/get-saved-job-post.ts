import { savedJobPosts } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'

export const getAllSavedJobPostsByUserId = async (userId: string) => {
  let savedForLater
  try {
    savedForLater = await db
      .select()
      .from(savedJobPosts)
      .where(eq(savedJobPosts.userId, userId))
  } catch (e) {
    console.error(e)
    return null
  }
  return savedForLater
}
