import 'server-only'

import { savedJobPosts } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { and, eq } from 'drizzle-orm'

export const deleteSavedJobPostByIdAndUserId = async (
  id: string,
  userId: string,
) => {
  try {
    await db
      .delete(savedJobPosts)
      .where(
        and(
          eq(savedJobPosts.id, id),
          eq(savedJobPosts.userId, userId),
        ),
      )
  } catch (e) {
    console.error(e)
    return null
  }
  return true
}
