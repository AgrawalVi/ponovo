import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { getAllSavedJobPostsByUserIdAndApplicationSeasonId } from '@/data/saved-job-post/get-saved-job-post'
import { currentUserId } from '@/lib/auth'
import { z } from 'zod'

export const savedJobPostsRouter = createTRPCRouter({
  getAllSavedJobPostsByApplicationSeasonId: publicProcedure
    .input(z.string())
    .query(async ({ input: applicationSeasonId }) => {
      const userId = await currentUserId()
      if (!userId) {
        throw new Error('Unauthorized')
      }
      const savedForLater =
        await getAllSavedJobPostsByUserIdAndApplicationSeasonId(
          userId,
          applicationSeasonId,
        )

      if (savedForLater === null) {
        throw new Error('No saved for later applications')
      }

      return savedForLater
    }),
})
