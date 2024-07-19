import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const applicationStatusEnum = pgEnum('application_status', [
  'applied',
  'interviewed',
  'rejected',
  'offer-received',
  'offer-declined',
  'offer-accepted',
])

export const timeLineUpdateEnum = pgEnum('time_line_update', [
  'applied',
  'online-assessment-received',
  'interview-scheduled',
  'rejected',
  'offer-received',
  'offer-declined',
  'offer-accepted',
])

export const jobRoleTypeEnum = pgEnum('job_role_type', [
  'full-time',
  'co-op',
  'internship',
])

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),

  preferredJobType: jobRoleTypeEnum('user_role_preference')
    .notNull()
    .default('internship'),

  clerkId: text('clerk_id').notNull().unique(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const usersRelations = relations(users, ({ many }) => ({
  jobApplications: many(jobApplications),
}))

export const jobApplications = pgTable('job_applications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  applicationStatus: applicationStatusEnum('application_status')
    .notNull()
    .default('applied'),

  dateApplied: timestamp('date_applied').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const jobApplicationsRelations = relations(
  jobApplications,
  ({ one, many }) => ({
    users: one(users, {
      fields: [jobApplications.userId],
      references: [users.id],
    }),
    jobApplicationTimelineUpdates: many(jobApplicationTimelineUpdates),
  }),
)

export const jobApplicationTimelineUpdates = pgTable(
  'job_application_timeline_updates',
  {
    id: serial('id').primaryKey(),
    jobApplicationId: integer('job_application_id')
      .notNull()
      .references(() => jobApplications.id, { onDelete: 'cascade' }),
    timeLineUpdate: timeLineUpdateEnum('time_line_update').notNull(),

    timelineUpdateReceivedAt: timestamp('timeline_update_received_at')
      .notNull()
      .defaultNow(),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date()),

    comments: text('comments'),
  },
)

export const jobApplicationTimelineUpdatesRelations = relations(
  jobApplicationTimelineUpdates,
  ({ one }) => ({
    jobApplication: one(jobApplications, {
      fields: [jobApplicationTimelineUpdates.jobApplicationId],
      references: [jobApplications.id],
    }),
  }),
)

export const jobPosts = pgTable('job_posts', {
  id: serial('id').primaryKey(),
  companyName: text('company_name').notNull(),
  jobTitle: text('job_title').notNull(),

  jobDescriptionRichText: text('job_description_rich_text'),
  jobDescriptionPlainText: text('job_description_plain_text'),

  url: text('url'),

  jobApplicationId: integer('job_application_id')
    .notNull()
    .references(() => jobApplications.id, { onDelete: 'cascade' }),
})

export const jobPostsRelations = relations(jobPosts, ({ one }) => ({
  jobApplication: one(jobApplications, {
    fields: [jobPosts.jobApplicationId],
    references: [jobApplications.id],
  }),
}))
