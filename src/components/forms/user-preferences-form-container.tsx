'use client'

import { useUser } from '@clerk/nextjs'
import UserPreferencesForm from './user-preference-form'
import { roleTypeEnum, statusEnum } from '@/types'

const UserPreferencesFormContainer = () => {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return null
  }

  if (!user) {
    return null
  }

  return (
    <UserPreferencesForm
      applicationGoal={user.publicMetadata.applicationGoal as number}
      roleType={user.publicMetadata.roleType as roleTypeEnum}
      timelineUpdateType={user.publicMetadata.timelineUpdateType as statusEnum}
    />
  )
}

export default UserPreferencesFormContainer
