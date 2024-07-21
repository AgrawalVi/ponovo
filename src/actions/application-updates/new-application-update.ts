'use server'

import { z } from 'zod'
import { applicationTimelineSchema } from '@/schemas'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import {
  users,
  jobApplications,
  jobApplicationTimelineUpdates,
} from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function newApplicationUpdate(
  values: z.infer<typeof applicationTimelineSchema>,
  jobApplicationId: string,
) {
  const validatedFields = applicationTimelineSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { updateType, updateDate, comments } = validatedFields.data

  const currentUser = auth()

  if (!currentUser.userId) {
    return { error: 'Unauthorized' }
  }

  let existingUser
  try {
    existingUser = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, currentUser.userId))
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to get user' }
  }

  if (existingUser.length !== 1) {
    return { error: 'User not found' }
  }

  let existingApplication
  try {
    existingApplication = await db
      .select()
      .from(jobApplications)
      .where(
        and(
          eq(jobApplications.userId, existingUser[0].id),
          eq(jobApplications.id, jobApplicationId),
        ),
      )
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to get application' }
  }

  if (existingApplication.length !== 1) {
    return { error: 'Application not found' }
  }

  try {
    await db.insert(jobApplicationTimelineUpdates).values({
      jobApplicationId: existingApplication[0].id,
      timeLineUpdate: updateType,
      timelineUpdateReceivedAt: updateDate,
      comments: comments,
      userId: existingUser[0].id,
    })
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to insert application update' }
  }

  revalidatePath('/dashboard')
  return { success: 'Application update logged successfully' }
}
