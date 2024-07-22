import 'server-only'

import { db } from '@/lib/db'
import { jobApplications } from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'

export const deleteJobApplicationByIdAndUserId = async (
  id: string,
  userId: string,
) => {
  try {
    await db
      .delete(jobApplications)
      .where(
        and(eq(jobApplications.id, id), eq(jobApplications.userId, userId)),
      )
  } catch (e) {
    console.error(e)
    return null
  }
  return true
}
