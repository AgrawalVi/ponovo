import { applicationSeasons } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { and, eq } from 'drizzle-orm'

export const getApplicationSeasonById = async (id: string) => {
  const applicationSeason = await db
    .select()
    .from(applicationSeasons)
    .where(eq(applicationSeasons.id, id))
    .limit(1)

  return applicationSeason[0] ?? null
}

export const getAllApplicationSeasonsByUserId = async (userId: string) => {
  return await db
    .select()
    .from(applicationSeasons)
    .where(eq(applicationSeasons.userId, userId))
}

export const getActiveApplicationSeasonByUserId = async (userId: string) => {
  const applicationSeason = await db
    .select()
    .from(applicationSeasons)
    .where(
      and(
        eq(applicationSeasons.userId, userId),
        eq(applicationSeasons.active, true),
      ),
    )
    .limit(1)

  return applicationSeason[0] ?? null
}
