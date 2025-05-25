'use server'

import { track } from '@vercel/analytics/server'
import { revalidatePath } from 'next/cache'
import { deleteSavedJobPostByIdAndUserId } from '@/data/saved-job-post/delete-saved-job-post'
import { currentUserId } from '@/lib/auth'

export async function deleteSavedJobPost(savedJobPostId: string) {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  try {
    const result = await deleteSavedJobPostByIdAndUserId(savedJobPostId, userId)
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to delete the saved job post' }
  }

  track('Saved Job Post Deleted')

  revalidatePath('/dashboard')
  return { success: 'Saved Job Post deleted successfully' }
}
