import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { jobApplications } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'

export const timeLineUpdatesRouter = createTRPCRouter({
  getAllByApplicationId: publicProcedure
    .input(z.object({ id: z.string().optional() }))
    .query(async ({ input }) => {
      if (!input.id || input.id === null) {
        return null
      }
      const jobApplicationTimelineUpdates =
        await db.query.jobApplications.findFirst({
          where: eq(jobApplications.id, input.id),
          with: {
            jobApplicationTimelineUpdates: {
              orderBy: (jobApplicationTimelineUpdates, { asc }) => [
                asc(jobApplicationTimelineUpdates.timelineUpdateReceivedAt),
              ],
            },
          },
        })
      if (!jobApplicationTimelineUpdates) {
        return null
      }
      return jobApplicationTimelineUpdates
    }),
})
