'use server'

import { editApplicationSeasonDb } from '@/data/application-seasons/edit-application-season'
import { getApplicationSeasonByIdAndUserId } from '@/data/application-seasons/get-application-season'
import { currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { editApplicationSeasonSchema } from '@/schemas'
import { z } from 'zod'

export const editApplicationSeason = async (
  id: string,
  values: z.infer<typeof editApplicationSeasonSchema>,
) => {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = editApplicationSeasonSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, description } = validatedFields.data

  try {
    await db.transaction(async (tx) => {
      const existingApplicationSeason = await getApplicationSeasonByIdAndUserId(
        { id, userId },
        tx,
      )
      if (!existingApplicationSeason) {
        throw new Error('Application season not found')
      }

      await editApplicationSeasonDb(
        id,
        {
          name,
          description,
        },
        tx,
      )
    })
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message }
    }
    return { error: 'Something went wrong!' }
  }

  return { success: 'Application season updated' }
}
