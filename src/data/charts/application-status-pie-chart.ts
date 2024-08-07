import 'server-only'

import { getAllJobApplicationsByUserId } from '../job-applications/get-job-applications'
import { getUserByClerkId } from '../users/get-users'
import { statusEnum } from '@/types'

export const getChartStatusByApplicationStatus = (status: statusEnum) => {
  switch (status) {
    case 'applied':
      return 'applied'
    case 'online-assessment-received':
      return 'online-assessment'
    case 'online-assessment-completed':
      return 'online-assessment'
    case 'interview-scheduled':
      return 'interview'
    case 'interviewed':
      return 'interview'
    case 'offer-received':
      return 'offer'
    case 'offer-declined':
      return 'offer'
    case 'offer-accepted':
      return 'offer'
    default:
      return 'applied'
  }
}

export default async function getApplicationStatusPieChartData(
  clerkId: string,
) {
  const existingUser = await getUserByClerkId(clerkId)

  if (!existingUser) {
    return null
  }

  const jobApplications = await getAllJobApplicationsByUserId(existingUser.id)

  if (!jobApplications) {
    return null
  }

  let appliedCount = 0
  let interviewCount = 0
  let offerCount = 0
  let onlineAssessmentCount = 0

  if (jobApplications) {
    for (const application of jobApplications) {
      const status = await getChartStatusByApplicationStatus(
        application.applicationStatus,
      )
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
