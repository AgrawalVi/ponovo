'use server'

import { autoUpdateContactStatusByIdAndUserId } from '@/data/contacts/contacts/edit-contacts'
import { deleteContactTimelineUpdateById } from '@/data/contacts/contacts/contact-timeline-update/delete-contact-timeline-update'
import { currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { track } from '@vercel/analytics/server'
import { revalidatePath } from 'next/cache'
import { getContactTimelineUpdateWithContactByIdAndUserId } from '@/data/contacts/contacts/contact-timeline-update/get-contact-timeline-update'
import { ServerActionResponse } from '@/types'

export async function deleteContactTimelineUpdate(
  contactTimelineUpdateId: string,
  contactId: string,
): Promise<ServerActionResponse> {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

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

      await deleteContactTimelineUpdateById(contactTimelineUpdateId, tx)
    })
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message }
    }
    return { error: 'Database failed to delete the timeline update' }
  }

  // transaction to do the auto update of the contact status. OK to do this separate from timeline update deletion
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
      warning:
        'Something went wrong when trying to auto-update application status',
    } // TODO: implement "warning" on the frontend
  }

  if (!contact) {
    return {
      warning:
        'Something went wrong when trying to auto-update application status',
    } // TODO: implement "warning" on the frontend
  }

  track('Contact Timeline Update Deleted')

  revalidatePath('/dashboard')
  return { success: 'Contact timeline update deleted successfully' }
}
