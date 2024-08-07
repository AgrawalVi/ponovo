import 'server-only'

import {
  getAllJobApplicationsByUserId,
  getAllJobApplicationsWithTimelineUpdatesDescendingByUserId,
} from '../job-applications/get-job-applications'
import { getUserByClerkId } from '../users/get-users'
import { statusEnum } from '@/types'
import { getFurthestStatusByApplication } from '@/utilities/applications'

export default async function getApplicationStatusPieChartData(
  clerkId: string,
) {
  const existingUser = await getUserByClerkId(clerkId)

  if (!existingUser) {
    return null
  }

  const jobApplications =
    await getAllJobApplicationsWithTimelineUpdatesDescendingByUserId(
      existingUser.id,
    )

  if (!jobApplications) {
    return null
  }

  let appliedCount = 0
  let interviewCount = 0
  let offerCount = 0
  let onlineAssessmentCount = 0

  if (jobApplications) {
    for (const application of jobApplications) {
      const status = getFurthestStatusByApplication(application)
      if (!status) {
        continue
      } else {
        switch (status) {
          case 'applied':
            appliedCount++
            break
          case 'interview':
            interviewCount++
            break
          case 'offer':
            offerCount++
            break
          case 'online-assessment':
            onlineAssessmentCount++
            break
        }
      }
    }
  }

  if (
    interviewCount === 0 &&
    offerCount === 0 &&
    onlineAssessmentCount === 0 &&
    appliedCount === 0
  ) {
    return null
  }

  return [
    {
      status: 'applied',
      count: appliedCount,
      fill: 'var(--color-applied)',
    },
    {
      status: 'interview',
      count: interviewCount,
      fill: 'var(--color-interview)',
    },
    {
      status: 'offer',
      count: offerCount,
      fill: 'var(--color-offer)',
    },
    {
      status: 'online-assessment',
      count: onlineAssessmentCount,
      fill: 'var(--color-online-assessment)',
    },
  ]
}
