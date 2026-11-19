import { currentUser, currentUserId } from '@/lib/auth'
import { redirect } from 'next/navigation'
import RequestGmailScopesButton from './request-scopes-button'

export default async function MercuryPage() {
  const userId = await currentUserId()

  if (!userId) {
    redirect('/')
  }

  return (
    <div>
      <div>Mercury</div>
      <RequestGmailScopesButton />
    </div>
  )
}
