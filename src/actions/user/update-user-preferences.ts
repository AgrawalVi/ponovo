'use server'

import { updateUserPreferencesByClerkId } from '@/data/users/edit-users.ts'
import { userPreferenceSchema } from '@/schemas'
import { auth } from '@clerk/nextjs/server'
import { track } from '@vercel/analytics/server'
import { z } from 'zod'

export const updateUserPreferences = async (
  values: z.infer<typeof userPreferenceSchema>,
) => {
  const validatedFields = userPreferenceSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const user = auth()

  if (!user.userId) {
    return { error: 'Unauthorized' }
  }

  const { applicationGoal } = validatedFields.data

  const updatedUser = await updateUserPreferencesByClerkId(
    user.userId,
    applicationGoal,
  )

  if (!updatedUser) {
    return { error: 'Database failed to update user' }
  }

  track('User Preferences Updated', { userId: user.userId })

  return { success: 'User preferences updated successfully' }
}
