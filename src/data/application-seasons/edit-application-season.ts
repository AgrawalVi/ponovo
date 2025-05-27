import { applicationSeasons } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { DbOrTx } from '@/types/drizzle'
import { eq } from 'drizzle-orm'

export const deactivateAllApplicationSeasons = async (
  userId: string,
  tx: DbOrTx = db,
) => {
  await tx
    .update(applicationSeasons)
    .set({ active: false })
    .where(eq(applicationSeasons.userId, userId))
}
