import { type ClassValue, clsx } from 'clsx'
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
