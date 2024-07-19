'use server'

import { z } from 'zod'
import { newApplicationSchema } from '@/schemas'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users, jobPosts, jobApplications } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function newApplication(
  values: z.infer<typeof newApplicationSchema>,
) {
  const validatedFields = newApplicationSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { companyName, jobTitle, url, status, roleType, appliedDate } =
    validatedFields.data

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

  let jobApplication
  try {
    jobApplication = await db
      .insert(jobApplications)
      .values({
        userId: existingUser[0].id,
        applicationStatus: status,
        dateApplied: appliedDate,
      })
      .returning({ id: jobApplications.id })
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to insert job application' }
  }
  try {
    await db.insert(jobPosts).values({
      jobApplicationId: jobApplication[0].id,
      companyName: companyName,
      jobTitle: jobTitle,
      url: url,
    })
  } catch (e) {
    await db
      .delete(jobApplications)
      .where(eq(jobApplications.id, jobApplication[0].id))
    console.error(e)
    return { error: 'Database failed to insert job post!' }
  }

  return { success: 'Application logged successfully' }
}
