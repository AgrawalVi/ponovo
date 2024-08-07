import { dbJobApplicationWithTimelineUpdates, statusEnum } from '@/types'

export const getFurthestStatusByJobApplicationStatus = (status: statusEnum) => {
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

export const getFurthestStatusByApplication = (
  applicationWithTimelineUpdate: dbJobApplicationWithTimelineUpdates,
) => {
  const status = applicationWithTimelineUpdate.applicationStatus
  const updates = applicationWithTimelineUpdate.jobApplicationTimelineUpdates

  if (!updates || updates.length === 0 || status !== 'rejected') {
    return getFurthestStatusByJobApplicationStatus(status)
  }

  if (updates[0].timeLineUpdate === 'rejected') {
    if (!updates[1]) {
      return 'applied'
    }
    return getFurthestStatusByJobApplicationStatus(updates[1].timeLineUpdate)
  } else {
    return getFurthestStatusByJobApplicationStatus(updates[0].timeLineUpdate)
  }
}
