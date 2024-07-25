'use server'

import { z } from 'zod'
import { newApplicationSchema } from '@/schemas'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { getUserByClerkId } from '@/data/users/get-users'
import { insertJobApplication } from '@/data/job-applications/insert-job-applications'
import { insertTimelineUpdate } from '@/data/timeline-updates/insert-timeline-updates'
import { track } from '@vercel/analytics/server'

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

  const existingUser = await getUserByClerkId(currentUser.userId)

  if (!existingUser) {
    return { error: 'User not found' }
  }

  const jobApplication = await insertJobApplication(
    existingUser.id,
    status,
    companyName,
    jobTitle,
    url,
    roleType,
    appliedDate,
  )

  if (!jobApplication) {
    return { error: 'Database failed to insert job application' }
  }

  if (jobApplication.applicationStatus === 'applied') {
    await insertTimelineUpdate(
      jobApplication.id,
      existingUser.id,
      'applied',
      appliedDate,
      undefined,
    )
  }

  track('Application Created', { applicationId: jobApplication.id })

  revalidatePath('/dashboard')
  return { success: 'Application logged successfully' }
}
