import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { getAllSavedJobPostsByUserId } from '@/data/saved-job-post/get-saved-job-post'
import { currentUserId } from '@/lib/auth'

export const savedJobPostsRouter = createTRPCRouter({
  getAllSavedJobPostsByUserId: publicProcedure.query(async () => {
    const userId = await currentUserId()
    if (!userId) {
      throw new Error('Unauthorized')
    }
    const savedForLater = await getAllSavedJobPostsByUserId(userId)

    if (savedForLater === null) {
      throw new Error('No saved for later applications')
    }

    return savedForLater
  }),
})
