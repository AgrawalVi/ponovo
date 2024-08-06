import {
  jobApplications,
  jobApplicationTimelineUpdates,
  users,
} from '@/drizzle/schema'

// DRIZZLE
export type dbJobApplication = typeof jobApplications.$inferSelect

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

// DATA TABLE
export type DataTableFacetedFilterOption = {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}
