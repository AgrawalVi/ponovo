import { z } from 'zod'
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { currentUserId } from '@/lib/auth'
import { getContactWithTimelineUpdatesDescendingByIdAndUserId } from '@/data/contacts/contacts/get-contact'

export const contactTimelineUpdatesRouter = createTRPCRouter({
  getAllByContactId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const userId = await currentUserId()
      if (!userId) {
        throw new Error('Unauthorized')
      }

      const contactWithTimelineUpdates =
        await getContactWithTimelineUpdatesDescendingByIdAndUserId(
          input.id,
          userId,
        )

      if (!contactWithTimelineUpdates) {
        throw new Error('Contact not found')
      }

      return contactWithTimelineUpdates
    }),
})
