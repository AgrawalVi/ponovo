import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { auth } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/data/users/get-users'
import { getAllSavedForLaterByUserId } from '@/data/saved-for-later-applications/get-saved-for-later'

export const savedForLaterRouter = createTRPCRouter({
  getAllSavedForLaterByUserId: publicProcedure.query(async () => {
    const clerkUser = auth()
    if (!clerkUser.userId) {
      throw new Error('Unauthorized')
    }
    const user = await getUserByClerkId(clerkUser.userId)
    if (!user) {
      throw new Error('User not found')
    }
    const savedForLater = await getAllSavedForLaterByUserId(user.id)

    if (savedForLater === null) {
      throw new Error('No saved for later applications')
    }

    return savedForLater
  }),
})
