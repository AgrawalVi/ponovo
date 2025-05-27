import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { getAllSavedJobPostsByUserIdAndApplicationSeasonId } from '@/data/saved-job-post/get-saved-job-post'
import { currentUserId } from '@/lib/auth'
import { z } from 'zod'
import { getAllApplicationSeasonsByUserId } from '@/data/application-seasons/get-application-season'

export const applicationSeasonsRouter = createTRPCRouter({
  getAllApplicationSeasons: publicProcedure.query(async () => {
    const userId = await currentUserId()
    if (!userId) {
      throw new Error('Unauthorized')
    }
    const applicationSeasons = await getAllApplicationSeasonsByUserId(userId)

    return applicationSeasons
  }),
})
