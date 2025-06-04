'use server'

import { currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { ContactSchema } from '@/schemas'
import { z } from 'zod'
import { insertContact } from '@/data/contacts/contacts/insert-contact'
import { insertContactTimelineUpdate } from '@/data/contacts/timeline-updates/insert-timeline-update'
import { ServerActionResponse } from '@/types'
import { revalidatePath } from 'next/cache'

export const createContact = async (
  data: z.infer<typeof ContactSchema>,
): Promise<ServerActionResponse> => {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = ContactSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  try {
    await db.transaction(async (tx) => {
      const contact = await insertContact(userId, validatedFields.data, tx)

      if (!contact) {
        throw new Error('Failed to create contact')
      }

      await insertContactTimelineUpdate(
        contact.id,
        {
          updateType: 'contacted',
          updateDate: new Date(),
        },
        tx,
      )
    })
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      return { error: e.message }
    } else {
      return { error: 'Database failed to insert contact' }
    }
  }

  revalidatePath('/dashboard/[applicationSeasonId]/contacts')

  return { success: 'Contact created successfully' }
}
