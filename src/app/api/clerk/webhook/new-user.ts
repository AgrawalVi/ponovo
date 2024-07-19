import { UserJSON } from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { users } from '@/drizzle/schema'

export const newUser = async (user: UserJSON) => {
  // need to create the user in the database
  const userEmail = user.email_addresses.filter(
    (email) => email.id === user.primary_email_address_id,
  )

  try {
    await db.insert(users).values({
      email: userEmail[0].email_address,
      firstName: user.first_name,
      lastName: user.last_name,
      clerkId: user.id,
    })
  } catch (e) {
    console.error(e)
    return { error: 'unable to create user' + e }
  }

  return { success: 'user created' }
}
