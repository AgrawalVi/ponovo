import { contacts } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { ContactSchema } from '@/schemas'
import { DbOrTx } from '@/types/drizzle'
import { z } from 'zod'

export const insertContact = async (
  userId: string,
  data: z.infer<typeof ContactSchema>,
  tx: DbOrTx = db,
) => {
  const contact = await tx
    .insert(contacts)
    .values({
      userId,
      ...data,
    })
    .returning()

  return contact[0]
}
