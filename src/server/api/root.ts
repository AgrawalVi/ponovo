import { timeLineUpdatesRouter } from '@/server/api/routers/time-line-updates'
import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc'
import { savedJobPostsRouter } from '@/server/api/routers/saved-for-later'
import { userPreferencesRouter } from '@/server/api/routers/user-preferences'
import { applicationSeasonsRouter } from './routers/application-seasons'
import { contactTimelineUpdatesRouter } from './routers/contacts/contact-timeline-updates'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  contact: {
    contactTimelineUpdates: contactTimelineUpdatesRouter,
  },
  timeLineUpdates: timeLineUpdatesRouter,
  savedForLater: savedJobPostsRouter,
  userPreferences: userPreferencesRouter,
  applicationSeasons: applicationSeasonsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
