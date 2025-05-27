import { applicationSeasons } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { DbOrTx } from '@/types/drizzle'
import { eq } from 'drizzle-orm'
import { and } from 'drizzle-orm'

export const createApplicationSeason = async (
  dto: {
    userId: string
    name: string
    description?: string
  },
  tx: DbOrTx = db,
) => {
  const { userId, name, description } = dto

  const applicationSeason = await tx
    .insert(applicationSeasons)
    .values({
      name,
      description,
      userId,
      active: false,
    })
    .returning()

  return applicationSeason[0] ?? null
}
