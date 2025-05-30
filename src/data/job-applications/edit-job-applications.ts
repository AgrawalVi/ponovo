import 'server-only'

import { getJobApplicationWithTimelineUpdatesDescendingByIdAndUserId } from './get-job-applications'
import { statusEnum, dbJobApplication, roleTypeEnum } from '@/types'
import { db } from '@/lib/db'
import { jobApplications } from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'
import { DbOrTx } from '@/types/drizzle'

export const autoUpdateJobApplicationStatusByIdAndUserId = async (
  id: string,
  userId: string,
  tx: DbOrTx = db,
) => {
  const application =
    await getJobApplicationWithTimelineUpdatesDescendingByIdAndUserId(
      id,
      userId,
      tx,
    )

  if (!application) {
    return null
  }

  const latestUpdate = application.jobApplicationTimelineUpdates[0]
  const { jobApplicationTimelineUpdates, ...rest } = application

  const applicationOnly: dbJobApplication = rest

  if (!latestUpdate) {
    return applicationOnly
  }

  switch (latestUpdate.timeLineUpdate) {
    case 'online-assessment-completed':
      if (application.applicationStatus === 'online-assessment-completed') {
        return applicationOnly
      } else {
        return await changeApplicationStatusByIdAndUserId(
          id,
          userId,
          'online-assessment-completed',
        )
      }
    case 'interviewed':
      if (application.applicationStatus === 'interviewed') {
        return applicationOnly
      } else {
        return await changeApplicationStatusByIdAndUserId(
          id,
          userId,
          'interviewed',
        )
      }
    case 'rejected':
      if (application.applicationStatus === 'rejected') {
        return applicationOnly
      } else {
        return await changeApplicationStatusByIdAndUserId(
          id,
          userId,
          'rejected',
        )
      }
    case 'offer-received':
      if (application.applicationStatus === 'offer-received') {
        return applicationOnly
      } else {
        return await changeApplicationStatusByIdAndUserId(
          id,
          userId,
          'offer-received',
        )
      }
    case 'offer-declined':
      if (application.applicationStatus === 'offer-declined') {
        return applicationOnly
      } else {
        return await changeApplicationStatusByIdAndUserId(
          id,
          userId,
          'offer-declined',
        )
      }
    case 'offer-accepted':
      if (application.applicationStatus === 'offer-accepted') {
        return applicationOnly
      } else {
        return await changeApplicationStatusByIdAndUserId(
          id,
          userId,
          'offer-accepted',
        )
      }
    case 'online-assessment-received':
      if (application.applicationStatus === 'online-assessment-received') {
        return applicationOnly
      } else {
        return await changeApplicationStatusByIdAndUserId(
          id,
          userId,
          'online-assessment-received',
        )
      }
    case 'interview-scheduled':
      if (application.applicationStatus === 'interview-scheduled') {
        return applicationOnly
      } else {
        return await changeApplicationStatusByIdAndUserId(
          id,
          userId,
          'interview-scheduled',
        )
      }
    default:
      if (application.applicationStatus === 'applied') {
        return applicationOnly
      } else {
        return await changeApplicationStatusByIdAndUserId(id, userId, 'applied')
      }
  }
}

export const changeApplicationStatusByIdAndUserId = async (
  id: string,
  userId: string,
  status: statusEnum,
  tx: DbOrTx = db,
) => {
  const application = await tx
    .update(jobApplications)
    .set({
      applicationStatus: status,
    })
    .where(and(eq(jobApplications.id, id), eq(jobApplications.userId, userId)))
    .returning()
  return application[0] ?? null
}

export const editApplicationByIdAndUserId = async (
  id: string,
  userId: string,
  companyName: string,
  jobTitle: string,
  applicationStatus: statusEnum,
  roleType: roleTypeEnum,
  appliedDate: Date,
  url: string | undefined,
) => {
  return await db
    .update(jobApplications)
    .set({
      companyName,
      jobTitle,
      applicationStatus,
      roleType,
      dateApplied: appliedDate,
      url,
    })
    .where(and(eq(jobApplications.id, id), eq(jobApplications.userId, userId)))
    .returning()
}
