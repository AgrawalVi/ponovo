import 'server-only'

import { db } from '@/lib/db'
import { statusEnum, roleTypeEnum } from '@/types'
import { jobApplications } from '@/drizzle/schema'

export const insertJobApplication = async (
  userId: string,
  applicationStatus: statusEnum,
  companyName: string,
  jobTitle: string,
  url: string | undefined,
  roleType: roleTypeEnum,
  dateApplied: Date,
) => {
  let jobApplication
  try {
    jobApplication = await db
      .insert(jobApplications)
      .values({
        userId,
        applicationStatus,
        companyName,
        dateApplied,
        jobTitle,
        roleType,
        url,
      })
      .returning()
  } catch (e) {
    console.error(e)
    return null
  }
  if (jobApplication.length !== 1) {
    return null
  }
  return jobApplication[0]
}
