'use server'

import { getUserByClerkId } from '@/data/users/get-users'
import { savedForLaterApplicationSchema } from '@/schemas'
import { auth } from '@clerk/nextjs/server'
import { track } from '@vercel/analytics/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const editSavedForLaterApplication = async (
  values: z.infer<typeof savedForLaterApplicationSchema>,
  applicationId: string,
) => {
  const validatedFields = savedForLaterApplicationSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { companyName, jobTitle, url, roleType, addedDate } =
    validatedFields.data

  const currentUser = auth()

  if (!currentUser.userId) {
    return { error: 'Unauthorized' }
  }

  const existingUser = await getUserByClerkId(currentUser.userId)

  if (!existingUser) {
    return { error: 'User not found' }
  }

  const updatedTimelineUpdate = await editTimelineUpdateByIdAndUserId(
    timelineUpdateId,
    existingUser.id,
    updateType,
    updateDate,
    comments,
  )

  if (!updatedTimelineUpdate) {
    return { error: 'Timeline update not found' }
  }

  if (!application) {
    return { error: 'Database failed to update application status' }
  }

  track('Timeline Update Updated', { timelineUpdateId: timelineUpdateId })

  revalidatePath('/dashboard')
  return { success: 'Timeline update updated successfully' }
}
