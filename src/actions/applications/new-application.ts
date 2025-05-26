'use server'

import { z } from 'zod'
import { applicationSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { insertJobApplication } from '@/data/job-applications/insert-job-applications'
import { insertTimelineUpdate } from '@/data/timeline-updates/insert-timeline-updates'
import { track } from '@vercel/analytics/server'
import { currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'

export async function newApplication(
  values: z.infer<typeof applicationSchema>,
) {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = applicationSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const {
    companyName,
    jobTitle,
    url,
    status,
    roleType,
    appliedDate,
    applicationSeasonId,
  } = validatedFields.data

  try {
    await db.transaction(async (tx) => {
      const jobApplication = await insertJobApplication(
        userId,
        applicationSeasonId,
        status,
        companyName,
        jobTitle,
        url,
        roleType,
        appliedDate,
        tx,
      )

      if (!jobApplication) {
        throw new Error('Database failed to insert job application')
      }

      if (jobApplication.applicationStatus === 'applied') {
        await insertTimelineUpdate(
          jobApplication.id,
          userId,
          'applied',
          appliedDate,
          undefined,
          tx,
        )
      }
    })
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      return { error: e.message }
    } else {
      return { error: 'Database failed to insert job application' }
    }
  }

  track('Application Created')

  revalidatePath('/dashboard')
  return { success: 'Application logged successfully' }
}
