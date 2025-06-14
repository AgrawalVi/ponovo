import {
  applicationSeasons,
  contacts,
  contactStatusEnum,
  contactTimelineUpdates,
  jobApplications,
  jobApplicationTimelineUpdates,
  savedJobPosts,
  users,
} from '@/drizzle/schema'

// DRIZZLE
export type dbJobApplication = typeof jobApplications.$inferSelect
export type dbCreateApplicationType = typeof jobApplications.$inferInsert

export type dbUser = typeof users.$inferSelect

export type dbUserWithJobApplications = typeof users.$inferSelect & {
  jobApplications: (typeof jobApplications.$inferSelect)[]
}

export type dbJobApplicationWithTimelineUpdates =
  typeof jobApplications.$inferSelect & {
    jobApplicationTimelineUpdates: (typeof jobApplicationTimelineUpdates.$inferSelect)[]
  }

export type dbJobApplicationTimelineUpdate =
  typeof jobApplicationTimelineUpdates.$inferSelect

export type dbSavedJobPost = typeof savedJobPosts.$inferSelect

export type dbApplicationSeason = typeof applicationSeasons.$inferSelect

export type dbContact = typeof contacts.$inferSelect
export type dbCreateContactType = typeof contacts.$inferInsert

export type dbContactTimelineUpdate = typeof contactTimelineUpdates.$inferSelect

export type statusEnum =
  | 'applied'
  | 'online-assessment-received'
  | 'interview-scheduled'
  | 'interviewed'
  | 'online-assessment-completed'
  | 'rejected'
  | 'offer-received'
  | 'offer-declined'
  | 'offer-accepted'

export type roleTypeEnum = 'full-time' | 'co-op' | 'internship'

export type ContactStatusEnum = (typeof contactStatusEnum.enumValues)[number]

// END DRIZZLE

// DATA TABLE
export type DataTableFacetedFilterOption = {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}

export type ServerActionResponse =
  | { success: string; redirect?: string }
  | { warning: string }
  | { error: string }
