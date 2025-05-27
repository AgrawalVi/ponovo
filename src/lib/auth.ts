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

export const applicationSeasonGuard = async (
  applicationSeasonId: string,
  pathname: string,
) => {
  let userId

  let applicationSeason

  try {
    userId = await currentUserId()
  } catch {
    return { redirect: '/' }
  }

  try {
    applicationSeason = await getApplicationSeasonById(applicationSeasonId)
  } catch {
    return { redirect: pathname }
  }

  if (!userId) {
    return { redirect: '/' }
  }

  if (!applicationSeason || applicationSeason.userId !== userId) {
    return { redirect: pathname }
  }

  return { userId: userId }
}
