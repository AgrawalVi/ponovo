import 'server-only'

import { users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'

export const getUserByClerkId = async (clerkId: string) => {
  let user
  try {
    user = await db.select().from(users).where(eq(users.clerkId, clerkId))
  } catch (e) {
    console.error(e)
    return null
  }
  if (user.length !== 1) {
    return null
  }
  return user[0]
}
