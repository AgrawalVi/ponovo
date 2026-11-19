import 'server-only'

import { users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { and, eq } from 'drizzle-orm'

export const getUserPreferencesById = async (userId: string) => {
  const user = await db
    .select({
      applicationGoal: users.applicationGoal,
      preferredJobType: users.preferredJobType,
      defaultTimelineUpdateType: users.defaultTimelineUpdateType,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  return user[0] ?? null
}

export const getMercuryEnabledUserByEmail = async (email: string) => {
  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.email, email), eq(users.mercuryEnabled, true)))
    .limit(1)

  return user[0] ?? null
}
