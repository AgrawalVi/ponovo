import { headers } from 'next/headers'
import { auth } from '@/auth'
import { getApplicationSeasonById } from '@/data/application-seasons/get-application-season'
import { redirect } from 'next/navigation'

export const currentUser = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  })
}

export const currentUserId = async () => {
  const session = await currentUser()
  return session?.user?.id ?? null
}

export const applicationSeasonGuard = async (applicationSeasonId: string) => {
  const userIdPromise = currentUserId()
  const applicationSeasonPromise = getApplicationSeasonById(applicationSeasonId)

  const [userId, applicationSeason] = await Promise.all([
    userIdPromise,
    applicationSeasonPromise,
  ])

  if (!userId) {
    return { redirect: '/' }
  }

  if (!applicationSeason || applicationSeason.userId !== userId) {
    return { redirect: '/dashboard' }
  }

  return { userId: userId }
}
