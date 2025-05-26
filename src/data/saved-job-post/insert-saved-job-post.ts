import { db } from '@/lib/db'
import { savedJobPosts } from '@/drizzle/schema'
import { roleTypeEnum } from '@/types'

export const insertSavedJobPost = async (
  userId: string,
  applicationSeasonId: string,
  companyName: string,
  jobTitle: string,
  addedDate: Date,
  roleType: roleTypeEnum,
  url: string | undefined,
) => {
  const newJobPost = await db
    .insert(savedJobPosts)
    .values({
      userId,
      applicationSeasonId,
      companyName,
      jobTitle,
      addedDate,
      url,
      roleType,
    })
    .returning()

  return newJobPost[0] ?? null
}
