'use server'

import { deleteJobApplicationByIdAndUserId } from '@/data/job-applications/delete-job-application'
import { getUserByClerkId } from '@/data/users/get-users'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function deleteApplication(applicationId: string) {
  const currentUser = auth()

  if (!currentUser.userId) {
    return { error: 'Unauthorized' }
  }

  const existingUser = await getUserByClerkId(currentUser.userId)

  if (!existingUser) {
    return { error: 'User not found' }
  }

  const result = await deleteJobApplicationByIdAndUserId(
    applicationId,
    existingUser.id,
  )
  if (!result) {
    return { error: 'Database failed to delete job application' }
  }

  revalidatePath('/dashboard')
  return { success: 'Application deleted successfully' }
}
