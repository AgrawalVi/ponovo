import { applicationSeasons } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { DbOrTx } from '@/types/drizzle'
import { and, eq } from 'drizzle-orm'

export const deactivateAllApplicationSeasons = async (
  userId: string,
  tx: DbOrTx = db,
) => {
  await tx
    .update(applicationSeasons)
    .set({ active: false })
    .where(eq(applicationSeasons.userId, userId))
}

export const activateApplicationSeason = async (
  data: {
    id: string
    userId: string
  },
  tx: DbOrTx = db,
) => {
  await tx
    .update(applicationSeasons)
    .set({ active: true })
    .where(
      and(
        eq(applicationSeasons.id, data.id),
        eq(applicationSeasons.userId, data.userId),
      ),
    )
}

export const editApplicationSeasonDb = async (
  id: string,
  data: {
    name: string
    description?: string
  },
  tx: DbOrTx = db,
) => {
  await tx
    .update(applicationSeasons)
    .set({
      name: data.name,
      description: data.description,
    })
    .where(eq(applicationSeasons.id, id))
}
