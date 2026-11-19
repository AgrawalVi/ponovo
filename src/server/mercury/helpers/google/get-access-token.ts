import { AccountProviderId } from '@/constants/auth'
import { getMercuryEnabledUserByEmail } from '@/data/users/get-users'
import { dbUser } from '@/types'
import { AccessTokenWithUserInfo } from '@/types/mercury'
import { getAccessToken as getAccessTokenFromBetterAuth } from 'better-auth/api'
import 'server-only'

export const getAccessToken = async (
  email: string,
): Promise<AccessTokenWithUserInfo> => {
  let user: dbUser | null
  try {
    user = await getMercuryEnabledUserByEmail(email)
  } catch (e) {
    console.error(
      `[MERCURY][GET_USER_DATA][GET_USER_BY_EMAIL] Error getting user with email: ${email}\n`,
      e,
    )
    throw new Error(
      'No user with Mercury enabled could be found with email: ' + email,
    )
  }

  if (!user) {
    console.error(
      `[MERCURY][GET_USER_DATA][GET_MERCURY_ENABLED_USER_BY_EMAIL] User not found with email: ${email}\n`,
      'User not found',
    )
    throw new Error(
      'No user with Mercury enabled could be found with email: ' + email,
    )
  }

  const accessToken = await getAccessTokenFromBetterAuth({
    body: {
      userId: user.id,
      providerId: AccountProviderId.GOOGLE,
    },
  })

  if (!accessToken || !accessToken.accessToken) {
    console.error(
      `[MERCURY][GET_USER_DATA][GET_ACCESS_TOKEN] No access token found for user with email: ${email}\n`,
    )
    throw new Error('No access token found for user with email: ' + email)
  }

  return {
    accessToken: accessToken.accessToken,
    userId: user.id,
    email: user.email,
  }
}
