import { InferInsertModel } from 'drizzle-orm'
import { applicationStatusEnum, jobApplications, users } from '@/drizzle/schema'

export type dbJobApplication = typeof jobApplications.$inferSelect

export type dbUser = typeof users.$inferSelect

export type dbUserWithJobApplications = typeof users.$inferSelect & {
  jobApplications: (typeof jobApplications.$inferSelect)[]
}

export type applicationStatusEnum = typeof applicationStatusEnum.enumValues