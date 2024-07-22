import 'server-only'

import { jobApplications } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { and, eq } from 'drizzle-orm'

export const getJobApplicationByIdAndUserId = async (
  id: string,
  userId: string,
) => {
  let jobApplication
  try {
    jobApplication = await db
      .select()
      .from(jobApplications)
      .where(
        and(eq(jobApplications.id, id), eq(jobApplications.userId, userId)),
      )
  } catch (e) {
    console.error(e)
    return null
  }
  if (jobApplication.length !== 1) {
    return null
  }
  return jobApplication[0]
}

export const getJobApplicationWithTimelineUpdatesAscendingByIdAndUserId =
  async (id: string, userId: string) => {
    let jobApplicationWithTimelineUpdates
    try {
      jobApplicationWithTimelineUpdates =
        await db.query.jobApplications.findFirst({
          where: and(
            eq(jobApplications.id, id),
            eq(jobApplications.userId, userId),
          ),
          with: {
            jobApplicationTimelineUpdates: {
              orderBy: (jobApplicationTimelineUpdates, { asc }) => [
                asc(jobApplicationTimelineUpdates.timelineUpdateReceivedAt),
              ],
            },
          },
        })
    } catch (e) {
      console.error(e)
      return null
    }
    return jobApplicationWithTimelineUpdates
  }

export const getJobApplicationWithTimelineUpdatesDescendingByIdAndUserId =
  async (id: string, userId: string) => {
    let jobApplicationWithTimelineUpdates
    try {
      jobApplicationWithTimelineUpdates =
        await db.query.jobApplications.findFirst({
          where: and(
            eq(jobApplications.id, id),
            eq(jobApplications.userId, userId),
          ),
          with: {
            jobApplicationTimelineUpdates: {
              orderBy: (jobApplicationTimelineUpdates, { desc }) => [
                desc(jobApplicationTimelineUpdates.timelineUpdateReceivedAt),
              ],
            },
          },
        })
    } catch (e) {
      console.error(e)
      return null
    }
    return jobApplicationWithTimelineUpdates
  }