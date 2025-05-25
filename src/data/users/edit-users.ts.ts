import 'server-only'

import { users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { roleTypeEnum, statusEnum } from '@/types'

export const updateUserPreferencesByUserId = async (
  userId: string,
  applicationGoal: number,
  preferredJobType: roleTypeEnum,
  defaultTimelineUpdateType: statusEnum,
) => {
  const user = await db
    .update(users)
    .set({
      applicationGoal: applicationGoal,
      preferredJobType: preferredJobType,
      defaultTimelineUpdateType: defaultTimelineUpdateType,
    })
    .where(eq(users.id, userId))
    .returning()
  return user[0] ?? null
}
