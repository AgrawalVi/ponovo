'use server'

import { autoUpdateJobApplicationStatusByIdAndUserId } from '@/data/job-applications/edit-job-applications'
import { deleteTimelineUpdateByIdAndUserId } from '@/data/timeline-updates/delete-timeline-updates'
import { currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { track } from '@vercel/analytics/server'
import { revalidatePath } from 'next/cache'

export async function deleteTimelineUpdate(
  timelineUpdateId: string,
  applicationId: string,
) {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  try {
    await deleteTimelineUpdateByIdAndUserId(timelineUpdateId, userId)
  } catch (e) {
    throw new Error('Database failed to delete the timeline update')
  }

  // transaction to do the auto update of the application status. OK to do this separate from timeline update deletion
  let application
  try {
    await db.transaction(async (tx) => {
      application = await autoUpdateJobApplicationStatusByIdAndUserId(
        applicationId,
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

  track('Timeline Update Deleted')

  revalidatePath('/dashboard')
  return { success: 'Application deleted successfully' }
}
