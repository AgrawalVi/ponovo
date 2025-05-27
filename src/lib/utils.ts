import { ServerActionResponse } from '@/types'
import { QueryClient, QueryKey, useQueryClient } from '@tanstack/react-query'
import { type ClassValue, clsx } from 'clsx'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Replace the application season id in the pathname
 *
 * @param pathname - The pathname to replace the application season id in. Format should be `/org/{orgSlug}/rest/of/path`
 * @param newOrgSlug - The new application season id
 * @returns The pathname with the new application season id. Will be in the format `/org/{newOrgSlug}/rest/of/path`
 */
export const replaceApplicationSeasonId = (
  pathname: string,
  newApplicationSeasonId: string,
) => {
  const pathParts = pathname.split('/')
  pathParts[2] = newApplicationSeasonId
  return pathParts.join('/')
}

export const handleServerActionResponseForm = (
  response: ServerActionResponse,
  setOpen?: (open: boolean) => void,
  router?: AppRouterInstance,
  query?: {
    queryKey: QueryKey
    queryClient: QueryClient
  },
) => {
  if ('success' in response) {
    if (setOpen) {
      setOpen(false)
    }
    if (response.redirect) {
      if (router) {
        router.push(response.redirect)
      } else {
        toast.error(`No router found. Please redirect to ${response.redirect}`)
      }
    }
    if (query) {
      query.queryClient.invalidateQueries({ queryKey: query.queryKey })
    }
    toast.success(response.success)
  } else if ('warning' in response) {
    toast.warning(response.warning)
  } else if ('error' in response) {
    toast.error(response.error)
  }
}
