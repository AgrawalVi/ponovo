import 'server-only'

import { AccessTokenWithUserInfo } from '@/types/mercury'
import { getAccessToken } from '../helpers/google/get-access-token'

export const getThread = async (email: string, threadId: string) => {
  let tokenWithUserInfo: AccessTokenWithUserInfo

  try {
    tokenWithUserInfo = await getAccessToken(email)
  } catch (e) {
    console.error(
      `[MERCURY][GET_THREAD][GET_ACCESS_TOKEN] Error getting access token for user with email: ${email}\n`,
      e,
    )
    throw new Error('Failed to get access token for user with email: ' + email)
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/gmail/v1/users/${email}/threads/${threadId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokenWithUserInfo.accessToken}`,
        },
      },
    )

    if (!response.ok) {
      const error = await response.json()
      console.error(
        `[MERCURY][GET_THREAD][GOOGLE_API_ERROR] Error getting threadId ${threadId} for user with email: ${email}\n`,
        error,
      )
      return null
    }

    const thread = await response.json()

    console.log('thread', thread)

    return thread
  } catch (e) {
    console.error(
      `[MERCURY][GET_THREAD][FETCH_ERROR] Error getting threadId ${threadId} for user with email: ${email}\n`,
      e,
    )
    return null
  }
}
