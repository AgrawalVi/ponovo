import 'server-only'

import { users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { roleTypeEnum, statusEnum } from '@/types'

export const updateUserPreferencesByClerkId = async (
  clerkId: string,
  applicationGoal: number,
  preferredJobType: roleTypeEnum,
  defaultTimelineUpdateType: statusEnum,
) => {
  let user
  try {
    user = await db
      .update(users)
      .set({
        applicationGoal: applicationGoal,
        preferredJobType: preferredJobType,
        defaultTimelineUpdateType: defaultTimelineUpdateType,
      })
      .where(eq(users.clerkId, clerkId))
      .returning()
  } catch (e) {
    console.error(e)
    return null
  }
  if (user.length !== 1) {
    return null
  }
  return user[0]
}
