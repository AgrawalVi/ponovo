import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { auth } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/data/users/get-users'
import { getAllSavedJobPostsByUserId } from '@/data/saved-job-post/get-saved-job-post'

export const savedJobPostsRouter = createTRPCRouter({
  getAllSavedJobPostsByUserId: publicProcedure.query(async () => {
    const clerkUser = await auth()
    if (!clerkUser.userId) {
      throw new Error('Unauthorized')
    }
    const user = await getUserByClerkId(clerkUser.userId)
    if (!user) {
      throw new Error('User not found')
    }
    const savedForLater = await getAllSavedJobPostsByUserId(user.id)

    if (savedForLater === null) {
      throw new Error('No saved for later applications')
    }

    return savedForLater
  }),
})
