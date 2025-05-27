import {
  applicationSeasons,
  jobApplications,
  savedJobPosts,
} from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'

export const migrateToApplicationSeasons = async () => {
  const retrievedUsers = await db.query.users.findMany({
    with: {
      jobApplications: true,
      savedJobApplications: true,
    },
  })

  // Process all users in parallel
  await Promise.all(
    retrievedUsers.map(async (user) => {
      const applicationSeason = await db
        .insert(applicationSeasons)
        .values({
          userId: user.id,
          name: 'Default',
          description: 'Default application season.',
        })
        .returning()

      // Update all job applications for this user in parallel
      await Promise.all(
        user.jobApplications.map((application) =>
          db
            .update(jobApplications)
            .set({
              applicationSeasonId: applicationSeason[0].id,
            })
            .where(eq(jobApplications.id, application.id)),
        ),
      )

      // Update all saved job applications for this user in parallel
      await Promise.all(
        user.savedJobApplications.map((savedJobApplication) =>
          db
            .update(savedJobPosts)
            .set({
              applicationSeasonId: applicationSeason[0].id,
            })
            .where(eq(savedJobPosts.id, savedJobApplication.id)),
        ),
      )
    }),
  )
}

migrateToApplicationSeasons().then(() => {
  console.log('Migration complete')
  return
})
