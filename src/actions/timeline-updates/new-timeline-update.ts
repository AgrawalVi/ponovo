'use server'

import { z } from 'zod'
import { applicationTimelineUpdateSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { getJobApplicationByIdAndUserId } from '@/data/job-applications/get-job-applications'
import { insertTimelineUpdate } from '@/data/timeline-updates/insert-timeline-updates'
import { autoUpdateJobApplicationStatusByIdAndUserId } from '@/data/job-applications/edit-job-applications'
import { track } from '@vercel/analytics/server'
import { currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'

export async function newTimelineUpdate(
  values: z.infer<typeof applicationTimelineUpdateSchema>,
  jobApplicationId: string,
) {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = applicationTimelineUpdateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { updateType, updateDate, comments } = validatedFields.data

  try {
    const timelineUpdate = await insertTimelineUpdate(
      jobApplicationId,
      userId,
      updateType,
      updateDate,
      comments,
    )

    if (!timelineUpdate) {
      return { error: 'Job application not found' }
    }
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to insert timeline update' }
  }

  // transaction to do the auto update of the application status. OK to do this separate from timeline update deletion
  let application
  try {
    await db.transaction(async (tx) => {
      application = await autoUpdateJobApplicationStatusByIdAndUserId(
        jobApplicationId,
        userId,
        tx,
      )
    })
  } catch (e) {
    return {
      warning:
        'Something went wrong when trying to auto-update application status',
    } // TODO: implement "warning" on the frontend
  }

  if (!application) {
    return {
      warning:
        'Something went wrong when trying to auto-update application status',
    } // TODO: implement "warning" on the frontend
  }

  track('Timeline Update Created')

  revalidatePath('/dashboard')
  return { success: 'Application update logged successfully' }
}
