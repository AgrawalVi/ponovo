'use server'

import { currentUserId } from '@/lib/auth'
import { createApplicationSeasonSchema } from '@/schemas'
import { dbApplicationSeason, ServerActionResponse } from '@/types'
import { createApplicationSeason as createApplicationSeasonDb } from '@/data/application-seasons/create-application-season'
import { z } from 'zod'
import { db } from '@/lib/db'
import {
  deactivateAllApplicationSeasons,
  activateApplicationSeason,
} from '@/data/application-seasons/edit-application-season'
import { replaceApplicationSeasonId } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export const createApplicationSeason = async (
  values: z.infer<typeof createApplicationSeasonSchema>,
  pathname: string,
): Promise<ServerActionResponse> => {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }
  const validatedFields = createApplicationSeasonSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, description, active } = validatedFields.data

  let applicationSeason: dbApplicationSeason | null = null
  try {
    await db.transaction(async (tx) => {
      applicationSeason = await createApplicationSeasonDb(
        {
          userId,
          name,
          description,
        },
        tx,
      )

      if (!applicationSeason) {
        throw new Error('Failed to create application season')
      }

      if (active) {
        await deactivateAllApplicationSeasons(userId, tx)
        await activateApplicationSeason(
          { id: applicationSeason.id, userId },
          tx,
        )
      }
    })
  } catch (error) {
    return { error: 'Failed to create application season' }
  }

  if (!applicationSeason) {
    return { error: 'Failed to create application season' }
  }

  // Type assertion: we know applicationSeason is not null here
  const validApplicationSeason = applicationSeason as dbApplicationSeason

  revalidatePath(pathname)
  return {
    success: 'Application season created',
    redirect: active
      ? replaceApplicationSeasonId(pathname, validApplicationSeason.id)
      : undefined,
  }
}
