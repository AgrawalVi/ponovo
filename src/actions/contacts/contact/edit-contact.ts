'use server'

import { z } from 'zod'
import { ContactSchema } from '@/schemas'
import { revalidatePath } from 'next/cache'
import { track } from '@vercel/analytics/server'
import { currentUserId } from '@/lib/auth'
import { editContactByIdAndUserId } from '@/data/contacts/contacts/edit-contacts'

export async function editContact(
  values: z.infer<typeof ContactSchema>,
  contactId: string,
) {
  const userId = await currentUserId()

  if (!userId) {
    return { error: 'Unauthorized' }
  }

  const validatedFields = ContactSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Fields' }
  }

  try {
    const updatedContact = await editContactByIdAndUserId(
      contactId,
      userId,
      validatedFields.data,
    )

    if (!updatedContact) {
      return { error: 'Contact not found' }
    }
  } catch (e) {
    console.error(e)
    return { error: 'Database failed to update contact' }
  }

  track('Contact Updated')

  revalidatePath('/dashboard')
  return { success: 'Contact updated successfully' }
}
