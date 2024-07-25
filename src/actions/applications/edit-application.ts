'use server'

import { z } from 'zod'
import { newApplicationSchema } from '@/schemas'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { getUserByClerkId } from '@/data/users/get-users'
import { editApplicationByIdAndUserId } from '@/data/job-applications/edit-job-applications'
import { track } from '@vercel/analytics/server'

export async function editApplication(
  values: z.infer<typeof newApplicationSchema>,
  applicationId: string,
) {
  const validatedFields = newApplicationSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { companyName, jobTitle, url, status, roleType, appliedDate } =
    validatedFields.data

  const currentUser = auth()

  if (!currentUser.userId) {
    return { error: 'Unauthorized' }
  }

  const existingUser = await getUserByClerkId(currentUser.userId)

  if (!existingUser) {
    return { error: 'User not found' }
  }

  const updatedApplication = await editApplicationByIdAndUserId(
    applicationId,
    existingUser.id,
    companyName,
    jobTitle,
    status,
    roleType,
    appliedDate,
    url,
  )

  if (!updatedApplication) {
    return { error: 'Database failed to update application' }
  }

  track('Application Updated', { applicationId: updatedApplication.id })

  revalidatePath('/dashboard')
  return { success: 'Application updated successfully' }
}
