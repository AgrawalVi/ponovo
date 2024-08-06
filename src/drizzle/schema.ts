import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'
import { datetime } from 'drizzle-orm/mysql-core'

export const applicationStatusEnum = pgEnum('application_status', [
  'applied',
  'interviewed',
  'rejected',
  'offer-received',
  'offer-declined',
  'offer-accepted',
  'online-assessment-received',
  'interview-scheduled',
  'online-assessment-completed',
])

export const timeLineUpdateEnum = pgEnum('time_line_update', [
  'applied',
  'online-assessment-received',
  'interview-scheduled',
  'rejected',
  'offer-received',
  'offer-declined',
  'offer-accepted',
  'interviewed',
  'online-assessment-completed',
])

export const jobRoleTypeEnum = pgEnum('job_role_type', [
  'full-time',
  'co-op',
  'internship',
])

export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .$default(() => uuidv4()),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  applicationGoal: integer('application_goal').notNull().default(0),

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
  jobApplicationTimelineUpdates: many(jobApplicationTimelineUpdates),
}))

export const jobApplications = pgTable('job_applications', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  applicationStatus: applicationStatusEnum('application_status').notNull(),
  roleType: jobRoleTypeEnum('role_type').notNull(),

  dateApplied: timestamp('date_applied').notNull(),

  companyName: text('company_name').notNull(),
  jobTitle: text('job_title').notNull(),

  jobDescriptionRichText: text('job_description_rich_text'),
  jobDescriptionPlainText: text('job_description_plain_text'),

  url: text('url'),

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
    id: uuid('id')
      .primaryKey()
      .$defaultFn(() => uuidv4()),
    userId: uuid('user_id').references(() => users.id),
    jobApplicationId: uuid('job_application_id')
      .notNull()
      .references(() => jobApplications.id, { onDelete: 'cascade' }),

    timeLineUpdate: timeLineUpdateEnum('time_line_update').notNull(),
    timelineUpdateReceivedAt: timestamp('timeline_update_received_at')
      .notNull()
      .defaultNow(),
    comments: text('comments'),
    actionDate: timestamp('action-date'),
    url: text('url'),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date()),
  },
)

export const jobApplicationTimelineUpdatesRelations = relations(
  jobApplicationTimelineUpdates,
  ({ one }) => ({
    jobApplication: one(jobApplications, {
      fields: [jobApplicationTimelineUpdates.jobApplicationId],
      references: [jobApplications.id],
    }),
    user: one(users, {
      fields: [jobApplicationTimelineUpdates.userId],
      references: [users.id],
    }),
  }),
)
