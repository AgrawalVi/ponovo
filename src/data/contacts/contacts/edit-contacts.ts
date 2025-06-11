import { db } from '@/lib/db'
import { DbOrTx } from '@/types/drizzle'
import { getContactWithTimelineUpdatesDescendingByIdAndUserId } from './get-contact'
import { ContactStatusEnum, dbContact } from '@/types'
import { contacts } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export const autoUpdateContactStatusByIdAndUserId = async (
  id: string,
  userId: string,
  tx: DbOrTx = db,
) => {
  const contact = await getContactWithTimelineUpdatesDescendingByIdAndUserId(
    id,
    userId,
    tx,
  )

  if (!contact) {
    return null
  }

  const latestUpdate = contact.contactTimelineUpdates[0]
  const { contactTimelineUpdates, ...rest } = contact

  const contactOnly: dbContact = rest

  if (!latestUpdate) {
    return contactOnly
  }

  switch (latestUpdate.updateType) {
    case 'replied':
      if (contact.contactStatus === 'replied') {
        return contactOnly
      } else {
        return await changeContactStatusById(id, 'replied', tx)
      }
    case 'meeting-scheduled':
      if (contact.contactStatus === 'meeting-scheduled') {
        return contactOnly
      } else {
        return await changeContactStatusById(id, 'meeting-scheduled', tx)
      }
    case 'meeting-completed':
      if (contact.contactStatus === 'meeting-completed') {
        return contactOnly
      } else {
        return await changeContactStatusById(id, 'meeting-completed', tx)
      }
    case 'referral-received':
      if (contact.contactStatus === 'referral-received') {
        return contactOnly
      } else {
        return await changeContactStatusById(id, 'referral-received', tx)
      }
    case 'referral-promised':
      if (contact.contactStatus === 'referral-promised') {
        return contactOnly
      } else {
        return await changeContactStatusById(id, 'referral-promised', tx)
      }
    case 'referral-requested':
      if (contact.contactStatus === 'referral-requested') {
        return contactOnly
      } else {
        return await changeContactStatusById(id, 'referral-requested', tx)
      }
    case 'followed-up':
      if (contact.contactStatus === 'followed-up') {
        return contactOnly
      } else {
        return await changeContactStatusById(id, 'followed-up', tx)
      }
    case 'ghosted':
      if (contact.contactStatus === 'ghosted') {
        return contactOnly
      } else {
        return await changeContactStatusById(id, 'ghosted', tx)
      }
    default:
      if (contact.contactStatus === 'contacted') {
        return contactOnly
      } else {
        return await changeContactStatusById(id, 'contacted', tx)
      }
  }
}

export const changeContactStatusById = async (
  id: string,
  status: ContactStatusEnum,
  tx: DbOrTx = db,
) => {
  const contact = await tx
    .update(contacts)
    .set({
      contactStatus: status,
    })
    .where(eq(contacts.id, id))
    .returning()
  return contact[0] ?? null
}
