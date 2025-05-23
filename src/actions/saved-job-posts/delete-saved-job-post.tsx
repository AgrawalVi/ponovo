'use server'

import { getUserByClerkId } from '@/data/users/get-users'
import { auth } from '@clerk/nextjs/server'
import { track } from '@vercel/analytics/server'
import { revalidatePath } from 'next/cache'
import { deleteSavedJobPostByIdAndUserId } from '@/data/saved-job-post/delete-saved-job-post'

export async function deleteSavedJobPost(savedJobPostId: string) {
  const currentUser = await auth()

  if (!currentUser.userId) {
    return { error: 'Unauthorized' }
  }

  const existingUser = await getUserByClerkId(currentUser.userId)

  if (!existingUser) {
    return { error: 'User not found' }
  }

  const result = await deleteSavedJobPostByIdAndUserId(
    savedJobPostId,
    existingUser.id,
  )

  if (!result) {
    return { error: 'Database failed to delete timeline update' }
  }

  track('Saved Job Post Deleted', { savedJobPostId: savedJobPostId })

  revalidatePath('/dashboard')
  return { success: 'Saved Job Post deleted successfully' }
}
