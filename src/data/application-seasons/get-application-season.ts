import { applicationSeasons } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { DbOrTx } from '@/types/drizzle'
import { and, eq } from 'drizzle-orm'

export const getApplicationSeasonById = async (id: string) => {
  const applicationSeason = await db
    .select()
    .from(applicationSeasons)
    .where(eq(applicationSeasons.id, id))
    .limit(1)

  return applicationSeason[0] ?? null
}

export const getApplicationSeasonByIdAndUserId = async (
  data: {
    id: string
    userId: string
  },
  tx: DbOrTx = db,
) => {
  const applicationSeason = await tx
    .select()
    .from(applicationSeasons)
    .where(
      and(
        eq(applicationSeasons.id, data.id),
        eq(applicationSeasons.userId, data.userId),
      ),
    )
    .limit(1)

  return applicationSeason[0] ?? null
}

export const getAllApplicationSeasonsByUserId = async (userId: string) => {
  return await db.query.applicationSeasons.findMany({
    where: eq(applicationSeasons.userId, userId),
    orderBy: (applicationSeasons, { desc }) => [
      desc(applicationSeasons.createdAt),
    ],
  })
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
