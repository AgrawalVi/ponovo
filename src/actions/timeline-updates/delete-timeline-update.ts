'use server'

import { autoUpdateJobApplicationStatusByIdAndUserId } from '@/data/job-applications/edit-job-applications'
import { deleteTimelineUpdateByIdAndUserId } from '@/data/timeline-updates/delete-timeline-updates'
import { getUserByClerkId } from '@/data/users/get-users'
import { auth } from '@clerk/nextjs/server'
import { track } from '@vercel/analytics/server'
import { revalidatePath } from 'next/cache'

export async function deleteTimelineUpdate(
  timelineUpdateId: string,
  applicationId: string,
) {
  const currentUser = auth()

  if (!currentUser.userId) {
    return { error: 'Unauthorized' }
  }

  const existingUser = await getUserByClerkId(currentUser.userId)

  if (!existingUser) {
    return { error: 'User not found' }
  }

  const result = await deleteTimelineUpdateByIdAndUserId(
    timelineUpdateId,
    existingUser.id,
  )
  if (!result) {
    return { error: 'Database failed to delete timeline update' }
  }

  const application = await autoUpdateJobApplicationStatusByIdAndUserId(
    applicationId,
    existingUser.id,
  )

  if (!application) {
    return { error: 'Database failed to update application status' }
  }

  track('Timeline Update Deleted', { timelineUpdateId: timelineUpdateId })

  revalidatePath('/dashboard')
  return { success: 'Application deleted successfully' }
}
