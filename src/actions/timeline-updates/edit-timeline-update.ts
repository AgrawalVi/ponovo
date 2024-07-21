'use server'

import { z } from 'zod'
import { applicationTimelineUpdateSchema } from '@/schemas'
import { auth } from '@clerk/nextjs/server'
import { jobApplicationTimelineUpdates, users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export default async function editTimelineUpdate(
  values: z.infer<typeof applicationTimelineUpdateSchema>,
  timelineUpdateId: string,
  applicationId: string,
) {
  const validatedFields = applicationTimelineUpdateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { updateType, updateDate, comments } = validatedFields.data

  const currentUser = auth()

  if (!currentUser.userId) {
    return { error: 'Unauthorized' }
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, currentUser.userId))

  if (existingUser.length !== 1) {
    return { error: 'User not found' }
  }

  try {
    const timelineUpdate = await db
      .update(jobApplicationTimelineUpdates)
      .set({
        timeLineUpdate: updateType,
        timelineUpdateReceivedAt: updateDate,
        comments: comments,
      })
      .where(
        and(
          eq(jobApplicationTimelineUpdates.id, timelineUpdateId),
          eq(jobApplicationTimelineUpdates.userId, existingUser[0].id),
          eq(jobApplicationTimelineUpdates.jobApplicationId, applicationId),
        ),
      )
      .returning()

    if (timelineUpdate.length !== 1) {
      return { error: 'Timeline update not found' }
    }
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to update timeline update' }
  }

  revalidatePath('/dashboard')
  return { success: 'Timeline update updated successfully' }
}
