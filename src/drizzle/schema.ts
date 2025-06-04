import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { v4 as uuidv4 } from 'uuid'

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

export const contactStatusEnum = pgEnum('contact_status', [
  'contacted',
  'replied',
  'referral-requested',
  'referral-received',
  'ghosted',
  'connection-strengthened',
])

export const contactTimelineUpdateEnum = pgEnum('contact_timeline_update', [
  'contacted',
  'replied',
  'meeting-scheduled',
  'met',
  'follow-up-sent',
  'referral-requested',
  'referral-received',
  'thank-you-sent',
  'ghosted',
  'connection-strengthened',
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
  name: text('name').notNull(),

  emailVerified: boolean('email_verified').$defaultFn(() => !1),
  image: text('image'),

  applicationGoal: integer('application_goal').default(0),
  preferredJobType: jobRoleTypeEnum('user_role_preference').default(
    'internship',
  ),
  defaultTimelineUpdateType: applicationStatusEnum(
    'default-timeline-update-type',
  ).default('rejected'),

  createdAt: timestamp('created_at')
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  applicationSeasons: many(applicationSeasons),
  jobApplications: many(jobApplications),
  jobApplicationTimelineUpdates: many(jobApplicationTimelineUpdates),
  savedJobApplications: many(savedJobPosts),
  sessions: many(sessions),
  accounts: many(accounts),
  contacts: many(contacts),
}))

export const sessions = pgTable('sessions', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const accounts = pgTable('accounts', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
})

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const verifications = pgTable('verifications', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at').$defaultFn(() => new Date()),
})

export const applicationSeasons = pgTable('application_seasons', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),

  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),

  active: boolean('active').notNull().default(true),

  name: text('name').notNull(),
  description: text('description'),

  createdAt: timestamp('created_at').$defaultFn(() => new Date()),
  updatedAt: timestamp('updated_at')
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
})

export const applicationSeasonsRelations = relations(
  applicationSeasons,
  ({ one, many }) => ({
    user: one(users, {
      fields: [applicationSeasons.userId],
      references: [users.id],
    }),
    jobApplications: many(jobApplications),
    savedJobApplications: many(savedJobPosts),
  }),
)

export const jobApplications = pgTable('job_applications', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  applicationStatus: applicationStatusEnum('application_status').notNull(),
  roleType: jobRoleTypeEnum('role_type').notNull(),

  applicationSeasonId: uuid('application_season_id')
    .references(() => applicationSeasons.id, { onDelete: 'cascade' })
    .notNull(),

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
    applicationSeason: one(applicationSeasons, {
      fields: [jobApplications.applicationSeasonId],
      references: [applicationSeasons.id],
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
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

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

export const savedJobPosts = pgTable('saved_job_applications', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  applicationSeasonId: uuid('application_season_id')
    .references(() => applicationSeasons.id, { onDelete: 'cascade' })
    .notNull(),

  companyName: text('company_name').notNull(),
  jobTitle: text('job_title').notNull(),
  url: text('url'),
  addedDate: timestamp('added_date').notNull(),
  roleType: jobRoleTypeEnum('role_type').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const savedJobApplicationsRelations = relations(
  savedJobPosts,
  ({ one }) => ({
    user: one(users, {
      fields: [savedJobPosts.userId],
      references: [users.id],
    }),
    applicationSeason: one(applicationSeasons, {
      fields: [savedJobPosts.applicationSeasonId],
      references: [applicationSeasons.id],
    }),
  }),
)

export const contacts = pgTable('contacts', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),

  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  company: text('company_name'),
  jobTitle: text('job_title'),
  contactStatus: contactStatusEnum('contact_status').notNull(),

  name: text('name').notNull(),

  phone: text('phone'),
  email: text('email'),
  linkedInUrl: text('linked_in_url'),
  notes: text('notes'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const contactsRelations = relations(contacts, ({ one, many }) => ({
  user: one(users, {
    fields: [contacts.userId],
    references: [users.id],
  }),
  contactTimelineUpdates: many(contactTimelineUpdates),
}))

export const contactTimelineUpdates = pgTable('contact_timeline_updates', {
  id: uuid('id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),

  contactId: uuid('contact_id')
    .notNull()
    .references(() => contacts.id, { onDelete: 'cascade' }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
})

export const contactTimelineUpdatesRelations = relations(
  contactTimelineUpdates,
  ({ one }) => ({
    contact: one(contacts, {
      fields: [contactTimelineUpdates.contactId],
      references: [contacts.id],
    }),
  }),
)

export const contactsToJobApplications = pgTable(
  'contacts_to_job_applications',
  {
    contactId: uuid('contact_id')
      .notNull()
      .references(() => contacts.id, { onDelete: 'cascade' }),
    jobApplicationId: uuid('job_application_id')
      .notNull()
      .references(() => jobApplications.id, { onDelete: 'cascade' }),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [primaryKey({ columns: [t.contactId, t.jobApplicationId] })],
)
