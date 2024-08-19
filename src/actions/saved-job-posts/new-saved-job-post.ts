'use server'

import { z } from 'zod'
import { savedJobPostSchema } from '@/schemas'
import { auth } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/data/users/get-users'
import { track } from '@vercel/analytics/server'
import { insertSavedJobPost } from "@/data/saved-job-post/insert-saved-job-post";

export async function newSavedJobPost(
  values: z.infer<typeof savedJobPostSchema>,
) {
  const validatedFields = savedJobPostSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { companyName, jobTitle, url, roleType, addedDate } = validatedFields.data

  const currentUser = auth()

  if (!currentUser.userId) {
    return { error: 'Unauthorized' }
  }

  const existingUser = await getUserByClerkId(currentUser.userId)

  if (!existingUser) {
    return { error: 'User not found' }
  }

  const savedJobPost = await insertSavedJobPost(
    existingUser.id,
    companyName,
    jobTitle,
    addedDate,
    roleType,
    url
  )

  if (!savedJobPost) {
    return { error: 'Database failed to insert timeline update' }
  }

  track('Saved Job Post Created', { savedJobPostId: savedJobPost.id })

  return { success: 'Saved Job Post created successfully' }
}
