import 'server-only'

import { db } from '@/lib/db'
import { jobApplications } from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'

export const deleteJobApplicationByIdAndUserId = async (
  id: string,
  userId: string,
) => {
  await db
    .delete(jobApplications)
    .where(and(eq(jobApplications.id, id), eq(jobApplications.userId, userId)))
}
