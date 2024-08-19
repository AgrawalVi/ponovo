'use server'

import { getUserByClerkId } from '@/data/users/get-users'
import { savedJobPostSchema } from '@/schemas'
import { auth } from '@clerk/nextjs/server'
import { track } from '@vercel/analytics/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { editSavedJobPostByIdAndUserId } from "@/data/saved-job-post/edit-saved-job-post";

export const editSavedJobPost = async (
  values: z.infer<typeof savedJobPostSchema>,
  applicationId: string,
) => {
  const validatedFields = savedJobPostSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { companyName, jobTitle, url, roleType} =
    validatedFields.data

  const currentUser = auth()

  if (!currentUser.userId) {
    return { error: 'Unauthorized' }
  }

  const existingUser = await getUserByClerkId(currentUser.userId)

  if (!existingUser) {
    return { error: 'User not found' }
  }

  const updatedApplication = await editSavedJobPostByIdAndUserId(
    applicationId,
    existingUser.id,
    companyName,
    jobTitle,
    url,
    roleType
  )

  if (!updatedApplication) {
    return { error: 'Timeline update not found' }
  }

  track('Application updated', { applicationId: applicationId })

  revalidatePath('/dashboard')
  return { success: 'Timeline update updated successfully' }
}
