'use server'

import { getUserByClerkId } from '@/data/users/get-users'
import { applicationSchema } from '@/schemas'
import { auth } from '@clerk/nextjs/server'
import { track } from '@vercel/analytics/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { editSavedForLaterApplicationByIdAndUserId } from "@/data/saved-for-later-applications/edit-saved-for-later";

export const editSavedForLaterApplication = async (
  values: z.infer<typeof applicationSchema>,
  applicationId: string,
) => {
  const validatedFields = applicationSchema.safeParse(values)

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

  const updatedApplication = await editSavedForLaterApplicationByIdAndUserId(
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
