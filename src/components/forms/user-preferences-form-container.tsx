'use client'

import { useCurrentPreferences } from '../hooks/use-current-preferences'
import UserPreferencesForm from './user-preference-form'

const UserPreferencesFormContainer = () => {
  const { preferences, isLoading } = useCurrentPreferences()

  if (!preferences || isLoading) {
    return null
  }

  return (
    <UserPreferencesForm
      applicationGoal={preferences.applicationGoal ?? undefined}
      roleType={preferences.preferredJobType ?? undefined}
      timelineUpdateType={preferences.defaultTimelineUpdateType ?? undefined}
    />
  )
}

export default UserPreferencesFormContainer
