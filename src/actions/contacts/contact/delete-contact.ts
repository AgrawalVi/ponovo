'use server'

import { deleteContactByIdAndUserId } from '@/data/contacts/contacts/delete-contact'
import { currentUserId } from '@/lib/auth'
import { ServerActionResponse } from '@/types'
import { track } from '@vercel/analytics/server'
import { revalidatePath } from 'next/cache'

export async function deleteContact(
  contactId: string,
): Promise<ServerActionResponse> {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  try {
    await deleteContactByIdAndUserId(contactId, userId)
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to delete the contact' }
  }

  track('Contact deleted')

  revalidatePath('/dashboard')
  return { success: 'Contact deleted successfully' }
}
