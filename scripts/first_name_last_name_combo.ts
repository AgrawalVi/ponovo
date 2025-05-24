import { users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'

async function combineFirstNameAndLastName() {
  const retrievedUsers = await db.select().from(users)

  for (const user of retrievedUsers) {
    await db
      .update(users)
      .set({
        name: `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`,
        firstName: null,
        lastName: null,
      })
      .where(eq(users.id, user.id))
  }
}

combineFirstNameAndLastName().then(() => {
  console.log('done')
})
