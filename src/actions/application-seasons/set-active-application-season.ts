'use server'

import {
  deactivateAllApplicationSeasons,
  activateApplicationSeason,
} from '@/data/application-seasons/edit-application-season'
import { getApplicationSeasonByIdAndUserId } from '@/data/application-seasons/get-application-season'
import { currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { dbApplicationSeason, ServerActionResponse } from '@/types'
import { revalidatePath } from 'next/cache'

export const setActiveApplicationSeason = async (
  id: string,
): Promise<ServerActionResponse> => {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  let existingApplicationSeason: dbApplicationSeason | null = null
  try {
    await db.transaction(async (tx) => {
      existingApplicationSeason = await getApplicationSeasonByIdAndUserId(
        {
          userId,
          id,
        },
        tx,
      )

      if (!existingApplicationSeason) {
        throw new Error('Application season not found')
      }

      await deactivateAllApplicationSeasons(userId, tx)
      await activateApplicationSeason({ id, userId }, tx)
    })
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message }
    }
    return { error: 'Something went wrong!' }
  }

  if (!existingApplicationSeason) {
    return { error: 'Application season not found' }
  }

  const validApplicationSeason =
    existingApplicationSeason as dbApplicationSeason

  return {
    success: `Successfully set ${validApplicationSeason.name} as active`,
  }
}
