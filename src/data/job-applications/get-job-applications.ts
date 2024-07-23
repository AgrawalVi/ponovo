import 'server-only'

import { jobApplications } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { and, eq } from 'drizzle-orm'
import { timeLineUpdateEnum } from '@/types'

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

export const getAllJobApplicationsByUserId = async (userId: string) => {
  let applications
  try {
    applications = await db
      .select()
      .from(jobApplications)
      .where(eq(jobApplications.userId, userId))
  } catch (e) {
    console.error(e)
    return null
  }
  return applications
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

export const getFurthestStatusByJobApplicationId = async (id: string) => {
  let jobApplication
  try {
    jobApplication = await db.query.jobApplications.findFirst({
      where: eq(jobApplications.id, id),
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

  if (!jobApplication) {
    return null
  }

  const status = jobApplication.applicationStatus
  const updates = jobApplication.jobApplicationTimelineUpdates

  if (!updates || updates.length === 0) {
    return getFurthestApplicationStatusByUpdateStatus(status)
  }

  if (!updates[1]) {
    return 'applied'
  } else {
    return getFurthestApplicationStatusByUpdateStatus(updates[1].timeLineUpdate)
  }
}

export const getFurthestApplicationStatusByUpdateStatus = (
  status: timeLineUpdateEnum,
) => {
  switch (status) {
    case 'applied':
      return 'applied'
    case 'online-assessment-received':
      return 'interviewed'
    case 'interview-scheduled':
      return 'interviewed'
    case 'interviewed':
      return 'interviewed'
    case 'online-assessment-completed':
      return 'interviewed'
    case 'offer-received':
      return 'offer-received'
    case 'offer-declined':
      return 'offer-received'
    case 'offer-accepted':
      return 'offer-accepted'
    default:
      return 'applied'
  }
}
