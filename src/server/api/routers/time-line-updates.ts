import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { auth } from '@clerk/nextjs/server'
import { getUserByClerkId } from '@/data/users/get-users'
import { getJobApplicationWithTimelineUpdatesAscendingByIdAndUserId } from '@/data/job-applications/get-job-applications'

export const timeLineUpdatesRouter = createTRPCRouter({
  getAllByApplicationId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const clerkUser = auth()
      if (!clerkUser.userId) {
        throw new Error('Unauthorized')
      }
      const user = await getUserByClerkId(clerkUser.userId)
      if (!user) {
        throw new Error('User not found')
      }
      const jobApplicationsWithTimelineUpdates =
        await getJobApplicationWithTimelineUpdatesAscendingByIdAndUserId(
          input.id,
          user.id,
        )

      if (!jobApplicationsWithTimelineUpdates) {
        throw new Error('Job application not found')
      }

      return jobApplicationsWithTimelineUpdates
    }),
})
