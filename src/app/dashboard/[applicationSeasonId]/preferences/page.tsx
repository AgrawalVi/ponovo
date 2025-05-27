import UserPreferencesFormContainer from '@/components/forms/user-preferences-form-container'
import { currentUserId } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function PreferencesPage() {
  const userId = await currentUserId()

  if (!userId) {
    redirect('/')
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
      <UserPreferencesFormContainer />
    </div>
  )
}
