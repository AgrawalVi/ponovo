'use server'

import { z } from 'zod'
import { ContactTimelineUpdateSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { autoUpdateContactStatusByIdAndUserId } from '@/data/contacts/contacts/edit-contacts'
import { ServerActionResponse } from '@/types'
import { editContactTimelineUpdateById } from '@/data/contacts/timeline-updates/edit-contact-timeline-update'
import { getContactTimelineUpdateWithContactByIdAndUserId } from '@/data/contacts/contacts/contact-timeline-update/get-contact-timeline-update'

export async function editContactTimelineUpdate(
  values: z.infer<typeof ContactTimelineUpdateSchema>,
  contactTimelineUpdateId: string,
  contactId: string,
): Promise<ServerActionResponse> {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = ContactTimelineUpdateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  const { updateType, updateDate, comments } = validatedFields.data

  try {
    await db.transaction(async (tx) => {
      const contactTimelineUpdate =
        await getContactTimelineUpdateWithContactByIdAndUserId(
          contactTimelineUpdateId,
          userId,
          tx,
        )

      if (
        !contactTimelineUpdate ||
        contactTimelineUpdate.contact.userId !== userId
      ) {
        throw new Error('Contact timeline update not found')
      }

      await editContactTimelineUpdateById(
        contactTimelineUpdateId,
        {
          updateType,
          updateDate,
          comments,
        },
        tx,
      )
    })
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message }
    }
    return { error: 'Database failed to edit the timeline update' }
  }

  let contact
  try {
    await db.transaction(async (tx) => {
      contact = await autoUpdateContactStatusByIdAndUserId(
        contactId,
        userId,
        tx,
      )
    })
  } catch (e) {
    return {
      warning: 'Something went wrong when trying to auto-update contact status',
    } // TODO: implement "warning" on the frontend
  }

  if (!contact) {
    return {
      warning: 'Something went wrong when trying to auto-update contact status',
    } // TODO: implement "warning" on the frontend
  }

  revalidatePath('/dashboard')
  return { success: 'Contact timeline update edited successfully' }
}
