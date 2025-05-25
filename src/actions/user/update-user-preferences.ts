'use server'

import { updateUserPreferencesByUserId } from '@/data/users/edit-users.ts'
import { currentUserId } from '@/lib/auth'
import { userPreferenceSchema } from '@/schemas'
import { track } from '@vercel/analytics/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const updateUserPreferences = async (
  values: z.infer<typeof userPreferenceSchema>,
) => {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = userPreferenceSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { applicationGoal, roleType, timelineUpdateType } = validatedFields.data

  try {
    const updatedUser = await updateUserPreferencesByUserId(
      userId,
      applicationGoal,
      roleType,
      timelineUpdateType,
    )
    if (!updatedUser) {
      return { error: 'Unable to find user' }
    }
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to update user preferences' }
  }

  revalidatePath('/dashboard/preferences')
  track('User Preferences Updated')
  return { success: 'User preferences updated successfully' }
}
