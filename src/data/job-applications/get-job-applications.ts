import 'server-only'

import { jobApplications } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { and, eq } from 'drizzle-orm'
import { DbOrTx } from '@/types/drizzle'

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

export const getAllJobApplicationsByUserIdAndApplicationSeasonId = async (
  userId: string,
  applicationSeasonId: string,
) => {
  let applications
  applications = await db
    .select()
    .from(jobApplications)
    .where(
      and(
        eq(jobApplications.userId, userId),
        eq(jobApplications.applicationSeasonId, applicationSeasonId),
      ),
    )
  return applications
}

export const getAllJobApplicationsWithTimelineUpdatesDescendingByUserIdAndApplicationSeasonId =
  async (userId: string, applicationSeasonId: string) => {
    let jobApplicationsWithTimelineUpdates
    try {
      jobApplicationsWithTimelineUpdates =
        await db.query.jobApplications.findMany({
          where: and(
            eq(jobApplications.userId, userId),
            eq(jobApplications.applicationSeasonId, applicationSeasonId),
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
    return jobApplicationsWithTimelineUpdates
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
  async (id: string, userId: string, tx: DbOrTx = db) => {
    return await tx.query.jobApplications.findFirst({
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
  }
