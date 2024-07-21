import { InferInsertModel } from 'drizzle-orm'
import { jobApplications, users } from '@/drizzle/schema'

// DRIZZLE
export type dbJobApplication = typeof jobApplications.$inferSelect

export type dbUser = typeof users.$inferSelect

export type dbUserWithJobApplications = typeof users.$inferSelect & {
  jobApplications: (typeof jobApplications.$inferSelect)[]
}

export type applicationStatusEnum =
  | 'applied'
  | 'interviewed'
  | 'rejected'
  | 'offer-received'
  | 'offer-declined'
  | 'offer-accepted'

// DATA TABLE
export type DataTableFacetedFilterOption = {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}
