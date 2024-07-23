import 'server-only'

import {
  getAllJobApplicationsByUserId,
  getFurthestStatusByJobApplicationId,
} from '../job-applications/get-job-applications'
import { getUserByClerkId } from '../users/get-users'

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
  let interviewedCount = 0
  let offerReceivedCount = 0
  let offerAcceptedCount = 0

  if (jobApplications) {
    for (const application of jobApplications) {
      const status = await getFurthestStatusByJobApplicationId(application.id)
      if (!status) {
        continue
      } else {
        switch (status) {
          case 'applied':
            appliedCount++
            break
          case 'interviewed':
            interviewedCount++
            break
          case 'offer-received':
            offerReceivedCount++
            break
          case 'offer-accepted':
            offerAcceptedCount++
            break
        }
      }
    }
  }

  return [
    {
      status: 'applied',
      count: appliedCount,
      fill: 'var(--color-applied)',
    },
    {
      status: 'interviewed',
      count: interviewedCount,
      fill: 'var(--color-interviewed)',
    },
    {
      status: 'offer-received',
      count: offerReceivedCount,
      fill: 'var(--color-offer-received)',
    },
    {
      status: 'offer-accepted',
      count: offerAcceptedCount,
      fill: 'var(--color-offer-accepted)',
    },
  ]
}
