import { headers } from 'next/headers'
import { auth } from '@/auth'

export const currentUser = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  })
}

export const currentUserId = async () => {
  const session = await currentUser()
  return session?.user?.id ?? null
}
