import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { getUserPreferencesById } from '@/data/users/get-users'
import { currentUserId } from '@/lib/auth'

export const userPreferencesRouter = createTRPCRouter({
  getCurrentUserPreferences: publicProcedure.query(async () => {
    const userId = await currentUserId()
    if (!userId) {
      throw new Error('Unauthorized')
    }

    let userPreferences
    try {
      userPreferences = await getUserPreferencesById(userId)
      if (!userPreferences) {
        throw new Error('User preferences not found')
      }
    } catch (e) {
      console.error(e)
      throw new Error('Database failed to get user preferences')
    }

    return userPreferences
  }),
})
