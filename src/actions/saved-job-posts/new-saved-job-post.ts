'use server'

import { z } from 'zod'
import { savedJobPostSchema } from '@/schemas'
import { track } from '@vercel/analytics/server'
import { insertSavedJobPost } from '@/data/saved-job-post/insert-saved-job-post'
import { currentUserId } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function newSavedJobPost(
  values: z.infer<typeof savedJobPostSchema>,
) {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = savedJobPostSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const {
    companyName,
    jobTitle,
    url,
    roleType,
    addedDate,
    applicationSeasonId,
  } = validatedFields.data

  try {
    const savedJobPost = await insertSavedJobPost(
      userId,
      applicationSeasonId,
      companyName,
      jobTitle,
      addedDate,
      roleType,
      url,
    )

    if (!savedJobPost) {
      return { error: 'Database failed to insert saved job post' }
    }
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to insert saved job post' }
  }

  track('Saved Job Post Created')

  revalidatePath('/dashboard')
  return { success: 'Saved Job Post created successfully' }
}
