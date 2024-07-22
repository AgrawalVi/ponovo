'use server'

import { z } from 'zod'
import { applicationTimelineUpdateSchema } from '@/schemas'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { getUserByClerkId } from '@/data/users/get-users'
import { getJobApplicationByIdAndUserId } from '@/data/job-applications/get-job-applications'
import { insertTimelineUpdate } from '@/data/timeline-updates/insert-timeline-update'
import { autoUpdateJobApplicationStatusByIdAndUserId } from '@/data/job-applications/edit-job-applications'

export async function newTimelineUpdate(
  values: z.infer<typeof applicationTimelineUpdateSchema>,
  jobApplicationId: string,
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

  const existingUser = await getUserByClerkId(currentUser.userId)

  if (!existingUser) {
    return { error: 'User not found' }
  }

  const existingApplication = await getJobApplicationByIdAndUserId(
    jobApplicationId,
    existingUser.id,
  )

  if (!existingApplication) {
    return { error: 'Application not found' }
  }

  const timelineUpdate = await insertTimelineUpdate(
    existingApplication.id,
    updateType,
    updateDate,
    comments,
    existingUser.id,
  )

  if (!timelineUpdate) {
    return { error: 'Database failed to insert timeline update' }
  }

  const application = await autoUpdateJobApplicationStatusByIdAndUserId(
    existingApplication.id,
    existingUser.id,
  )

  if (!application) {
    return { error: 'Database failed to update application status' }
  }

  revalidatePath('/dashboard')
  return { success: 'Application update logged successfully' }
}
