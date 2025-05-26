import { applicationSeasons, jobApplications, users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'

export const migrateToApplicationSeasons = async () => {
  const retrievedUsers = await db.query.users.findMany({
    with: {
      jobApplications: true,
    },
  })

  for (const user of retrievedUsers) {
    const applicationSeason = await db
      .insert(applicationSeasons)
      .values({
        userId: user.id,
        name: 'Default',
        description: 'Default application season. Rename if necessary.',
      })
      .returning()

    for (const application of user.jobApplications) {
      await db
        .update(jobApplications)
        .set({
          applicationSeasonId: applicationSeason[0].id,
        })
        .where(eq(jobApplications.id, application.id))
    }
  }
}

migrateToApplicationSeasons().then(() => {
  console.log('Migration complete')
  return
})
