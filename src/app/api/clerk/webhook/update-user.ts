import { users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { UserJSON } from '@clerk/nextjs/server'

export const updateUser = async (user: UserJSON) => {
  // check email
  const userEmail = user.email_addresses.filter(
    (email) => email.id === user.primary_email_address_id,
  )

  try {
    await db.update(users).set({
      email: userEmail[0].email_address,
      firstName: user.first_name,
      lastName: user.last_name,
    })
  } catch (e) {
    console.error(e)
    return { error: 'unable to update user' + e }
  }

  return {
    success: 'user updated successfully',
  }
}
