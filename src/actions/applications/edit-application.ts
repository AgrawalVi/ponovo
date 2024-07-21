'use server'

import { z } from 'zod'
import { newApplicationSchema } from '@/schemas'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users, jobApplications } from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function editApplication(
  values: z.infer<typeof newApplicationSchema>,
  applicationId: string,
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
          eq(jobApplications.id, applicationId),
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
    await db
      .update(jobApplications)
      .set({
        companyName: companyName,
        jobTitle: jobTitle,
        url: url,
        applicationStatus: status,
        roleType: roleType,
        dateApplied: appliedDate,
      })
      .where(eq(jobApplications.id, applicationId))
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to update application' }
  }

  revalidatePath('/dashboard')
  return { success: 'Application updated successfully' }
}
