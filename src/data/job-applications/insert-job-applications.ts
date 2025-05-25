import 'server-only'

import { db } from '@/lib/db'
import { statusEnum, roleTypeEnum } from '@/types'
import { jobApplications } from '@/drizzle/schema'
import { DbOrTx } from '@/types/drizzle'

export const insertJobApplication = async (
  userId: string,
  applicationStatus: statusEnum,
  companyName: string,
  jobTitle: string,
  url: string | undefined,
  roleType: roleTypeEnum,
  dateApplied: Date,
  tx: DbOrTx = db,
) => {
  const addedApplication = await tx
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

  return addedApplication[0] ?? null
}
