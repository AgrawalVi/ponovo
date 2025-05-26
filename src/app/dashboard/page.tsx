import { getActiveApplicationSeasonByUserId } from '@/data/application-seasons/get-application-season'
import { currentUserId } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const userId = await currentUserId()

  if (!userId) {
    redirect('/')
  }

  let activeApplicationSeason
  try {
    activeApplicationSeason = await getActiveApplicationSeasonByUserId(userId)
  } catch (e) {
    console.error(e)
    redirect('/dashboard/create-application-season')
  }

  if (!activeApplicationSeason) {
    redirect('/dashboard/create-application-season')
  }

  redirect(`/dashboard/${activeApplicationSeason.id}`)
}
