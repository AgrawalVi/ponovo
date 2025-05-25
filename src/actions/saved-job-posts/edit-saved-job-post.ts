'use server'

import { savedJobPostSchema } from '@/schemas'
import { track } from '@vercel/analytics/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { editSavedJobPostByIdAndUserId } from '@/data/saved-job-post/edit-saved-job-post'
import { currentUserId } from '@/lib/auth'

export const editSavedJobPost = async (
  values: z.infer<typeof savedJobPostSchema>,
  applicationId: string,
) => {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = savedJobPostSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { companyName, jobTitle, url, roleType } = validatedFields.data

  try {
    const updatedApplication = await editSavedJobPostByIdAndUserId(
      applicationId,
      userId,
      companyName,
      jobTitle,
      url,
      roleType,
    )

    if (!updatedApplication) {
      return { error: 'Saved job post not found' }
    }
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to update the saved job post' }
  }

  track('Saved Job Post Updated')

  revalidatePath('/dashboard')
  return { success: 'Saved Job Post updated successfully' }
}
