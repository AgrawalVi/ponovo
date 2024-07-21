'use server'

import { jobApplicationTimelineUpdates, users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function deleteTimelineUpdate(timelineUpdateId: string) {
  const user = auth()

  if (!user.userId) {
    return { error: 'Unauthorized' }
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, user.userId))

  if (existingUser.length !== 1) {
    return { error: 'User not found' }
  }

  try {
    await db
      .delete(jobApplicationTimelineUpdates)
      .where(
        and(
          eq(jobApplicationTimelineUpdates.id, timelineUpdateId),
          eq(jobApplicationTimelineUpdates.userId, existingUser[0].id),
        ),
      )
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to delete user' }
  }

  revalidatePath('/dashboard')
  return { success: 'Application deleted successfully' }
}
