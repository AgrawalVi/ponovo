'use client'

import { api } from '@/trpc/react'
import { roleTypeEnum, statusEnum } from '@/types'
import type { TRPCClientErrorLike } from '@trpc/client'
import type { AppRouter } from '@/server/api/root'

export interface UserPreferences {
  applicationGoal: number | null
  preferredJobType: roleTypeEnum | null
  defaultTimelineUpdateType: statusEnum | null
}

export interface UseCurrentPreferencesReturn {
  preferences: UserPreferences | null
  isLoading: boolean
  isError: boolean
  error: TRPCClientErrorLike<AppRouter> | null
  refetch: () => void
}

/**
 * Hook to get current user preferences throughout the application
 *
 * @returns Object containing user preferences, loading state, error state, and refetch function
 *
 * @example
 * ```tsx
 * const { preferences, isLoading, isError } = useCurrentPreferences()
 *
 * if (isLoading) return <div>Loading...</div>
 * if (isError) return <div>Error loading preferences</div>
 *
 * // Use preferences in your form
 * const defaultRoleType = preferences?.preferredJobType ?? 'internship'
 * ```
 */
export const useCurrentPreferences = (): UseCurrentPreferencesReturn => {
  const query = api.userPreferences.getCurrentUserPreferences.useQuery()

  return {
    preferences: query.data ?? null,
    isLoading: query.isPending,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  }
}
