'use server'

import { deleteJobApplicationByIdAndUserId } from '@/data/job-applications/delete-job-application'
import { currentUserId } from '@/lib/auth'
import { track } from '@vercel/analytics/server'
import { revalidatePath } from 'next/cache'

export async function deleteApplication(applicationId: string) {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  try {
    await deleteJobApplicationByIdAndUserId(applicationId, userId)
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to delete the application' }
  }

  track('Application deleted')

  revalidatePath('/dashboard')
  return { success: 'Application deleted successfully' }
}
