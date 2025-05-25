'use server'

import { z } from 'zod'
import { applicationSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { editApplicationByIdAndUserId } from '@/data/job-applications/edit-job-applications'
import { track } from '@vercel/analytics/server'
import { currentUserId } from '@/lib/auth'

export async function editApplication(
  values: z.infer<typeof applicationSchema>,
  applicationId: string,
) {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = applicationSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { companyName, jobTitle, url, status, roleType, appliedDate } =
    validatedFields.data

  try {
    const updatedApplication = await editApplicationByIdAndUserId(
      applicationId,
      userId,
      companyName,
      jobTitle,
      status,
      roleType,
      appliedDate,
      url,
    )

    if (!updatedApplication || updatedApplication.length < 1) {
      return { error: 'Application not found' }
    }
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to update application' }
  }

  track('Application Updated')

  revalidatePath('/dashboard')
  return { success: 'Application updated successfully' }
}
