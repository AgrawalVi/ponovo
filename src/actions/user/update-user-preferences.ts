'use server'

import { updateUserPreferencesByClerkId } from '@/data/users/edit-users.ts'
import { userPreferenceSchema } from '@/schemas'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { track } from '@vercel/analytics/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const updateUserPreferences = async (
  values: z.infer<typeof userPreferenceSchema>,
) => {
  const validatedFields = userPreferenceSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const user = await auth()

  if (!user.userId) {
    return { error: 'Unauthorized' }
  }

  const { applicationGoal, roleType, timelineUpdateType } = validatedFields.data

  await clerkClient.users.updateUserMetadata(user.userId, {
    publicMetadata: {
      applicationGoal,
      roleType,
      timelineUpdateType,
    },
  })

  const updatedUser = await updateUserPreferencesByClerkId(
    user.userId,
    applicationGoal,
    roleType,
    timelineUpdateType,
  )

  if (!updatedUser) {
    return { error: 'Database failed to update user' }
  }
  revalidatePath('/dashboard/preferences')
  track('User Preferences Updated', { userId: user.userId })
  return { success: 'User preferences updated successfully' }
}
