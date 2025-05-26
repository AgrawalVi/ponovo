import { savedJobPosts } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq, and } from 'drizzle-orm'

export const getAllSavedJobPostsByUserIdAndApplicationSeasonId = async (
  userId: string,
  applicationSeasonId: string,
) => {
  let savedForLater
  try {
    savedForLater = await db
      .select()
      .from(savedJobPosts)
      .where(
        and(
          eq(savedJobPosts.userId, userId),
          eq(savedJobPosts.applicationSeasonId, applicationSeasonId),
        ),
      )
  } catch (e) {
    console.error(e)
    return null
  }
  return savedForLater
}
