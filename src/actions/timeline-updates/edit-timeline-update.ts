'use server'

import { z } from 'zod'
import { applicationTimelineUpdateSchema } from '@/schemas'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { getUserByClerkId } from '@/data/users/get-users'
import { editTimelineUpdateByIdAndUserId } from '@/data/timeline-updates/edit-timeline-updates'
import { autoUpdateJobApplicationStatusByIdAndUserId } from '@/data/job-applications/edit-job-applications'
import { track } from '@vercel/analytics/server'

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

  const existingUser = await getUserByClerkId(currentUser.userId)

  if (!existingUser) {
    return { error: 'User not found' }
  }

  const updatedTimelineUpdate = await editTimelineUpdateByIdAndUserId(
    timelineUpdateId,
    existingUser.id,
    updateType,
    updateDate,
    comments,
  )

  if (!updatedTimelineUpdate) {
    return { error: 'Timeline update not found' }
  }

  const application = await autoUpdateJobApplicationStatusByIdAndUserId(
    applicationId,
    existingUser.id,
  )

  if (!application) {
    return { error: 'Database failed to update application status' }
  }

  track('Timeline Update Updated', { timelineUpdateId: timelineUpdateId })

  revalidatePath('/dashboard')
  return { success: 'Timeline update updated successfully' }
}
