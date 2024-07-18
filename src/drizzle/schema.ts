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
  'wishlist',
  'applied',
  'rejected',
  'accepted',
])
export const timeLineUpdateEnum = pgEnum('time_line_update', [
  'applied',
  'online-assessment',
  'interview',
  'rejected',
  'accepted',
])

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),

  clerkId: text('clerk_id').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const usersRelations = relations(users, ({ many }) => ({
  jobApplications: many(jobApplications),
  companies: many(companies),
}))

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
})

export const companiesRelations = relations(companies, ({ one, many }) => ({
  users: one(users, {
    fields: [companies.userId],
    references: [users.id],
  }),
  jobApplications: many(jobApplications),
}))

export const jobApplications = pgTable('job_application', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  applicationStatus: applicationStatusEnum('application_status')
    .notNull()
    .default('applied'),

  companyId: integer('company_id'),

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
    company: one(companies, {
      fields: [jobApplications.companyId],
      references: [companies.id],
    }),
  })
)

export const jobApplicationTimelineUpdates = pgTable(
  'job_application_timeline_update',
  {
    id: serial('id').primaryKey(),
    jobApplicationId: integer('job_application_id')
      .notNull()
      .references(() => jobApplications.id, { onDelete: 'cascade' }),
    timeLineUpdate: timeLineUpdateEnum('time_line_update').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date()),

    comments: text('comments'),
  }
)

export const jobApplicationTimelineUpdatesRelations = relations(
  jobApplicationTimelineUpdates,
  ({ one }) => ({
    jobApplication: one(jobApplications, {
      fields: [jobApplicationTimelineUpdates.jobApplicationId],
      references: [jobApplications.id],
    }),
  })
)

export const jobPosts = pgTable('job_post', {
  id: serial('id').primaryKey(),
  companyName: text('company_name').notNull(),
  jobTitle: text('job_title').notNull(),

  jobDescriptionRichText: text('job_description_rich_text'),
  jobDescriptionPlainText: text('job_description_plain_text'),

  url: text('url').notNull(),

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
