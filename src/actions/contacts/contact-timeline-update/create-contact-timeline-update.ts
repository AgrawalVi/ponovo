'use server'

import { z } from 'zod'
import { ContactTimelineUpdateSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { insertTimelineUpdate } from '@/data/timeline-updates/insert-timeline-updates'
import { autoUpdateJobApplicationStatusByIdAndUserId } from '@/data/job-applications/edit-job-applications'
import { track } from '@vercel/analytics/server'
import { currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { insertContactTimelineUpdate } from '@/data/contacts/timeline-updates/insert-timeline-update'
import { autoUpdateContactStatusByIdAndUserId } from '@/data/contacts/contacts/edit-contacts'
import { ServerActionResponse } from '@/types'

export async function newContactTimelineUpdate(
  values: z.infer<typeof ContactTimelineUpdateSchema>,
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
    await insertContactTimelineUpdate(contactId, {
      updateType,
      updateDate,
      comments,
    })
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to insert timeline update' }
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

  revalidatePath('/dashboard')
  return { success: 'Contact timeline update logged successfully' }
}
