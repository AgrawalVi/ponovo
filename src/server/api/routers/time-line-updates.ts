import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { getJobApplicationWithTimelineUpdatesAscendingByIdAndUserId } from '@/data/job-applications/get-job-applications'
import { currentUserId } from '@/lib/auth'

export const timeLineUpdatesRouter = createTRPCRouter({
  getAllByApplicationId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const userId = await currentUserId()
      if (!userId) {
        throw new Error('Unauthorized')
      }

      const jobApplicationsWithTimelineUpdates =
        await getJobApplicationWithTimelineUpdatesAscendingByIdAndUserId(
          input.id,
          userId,
        )

      if (!jobApplicationsWithTimelineUpdates) {
        throw new Error('Job application not found')
      }

      return jobApplicationsWithTimelineUpdates
    }),
})
