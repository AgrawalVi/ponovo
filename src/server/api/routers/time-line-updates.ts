import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import {
  jobApplications,
  jobApplicationTimelineUpdates,
} from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'

export const timeLineUpdatesRouter = createTRPCRouter({
  getAllByApplicationId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
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
      return jobApplicationTimelineUpdates
    }),
})
