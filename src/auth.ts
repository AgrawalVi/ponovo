import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './lib/db'
import { users, sessions, accounts, verifications } from './drizzle/schema'
import { nextCookies } from 'better-auth/next-js'
import {
  sendEmailVerificationEmail,
  sendForgotPasswordEmail,
} from './server/email/account'
import { createApplicationSeason } from './data/application-seasons/create-application-season'
import { activateApplicationSeason } from './data/application-seasons/edit-application-season'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  appName: 'Ponovo',
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendForgotPasswordEmail(
        user.email,
        user.name.split(' ')[0].replace(/^./, (c) => c.toUpperCase()),
        url,
      )
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  advanced: { database: { generateId: false } },
  plugins: [nextCookies()],
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const urlWithCorrectCallback = url.replace(
        'callbackURL=/dashboard',
        'callbackURL=/auth/verify-email',
      )
      await sendEmailVerificationEmail(
        user.email,
        user.name.split(' ')[0].replace(/^./, (c) => c.toUpperCase()),
        urlWithCorrectCallback,
      )
    },
    autoSignInAfterVerification: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const createdApplicationSeason = await createApplicationSeason({
            userId: user.id,
            name: 'Default Application Season',
            description: 'Default application season. Edit if needed',
          })

          await activateApplicationSeason({
            id: createdApplicationSeason.id,
            userId: user.id,
          })
        },
      },
    },
  },
})
