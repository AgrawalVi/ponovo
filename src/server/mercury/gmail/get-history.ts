import 'server-only'

import { AccessTokenWithUserInfo } from '@/types/mercury'
import { getAccessToken } from '../helpers/google/get-access-token'

export const getHistory = async (email: string, historyId: string) => {
  let tokenWithUserInfo: AccessTokenWithUserInfo

  try {
    tokenWithUserInfo = await getAccessToken(email)
  } catch (e) {
    console.error(
      `[MERCURY][GET_HISTORY][GET_ACCESS_TOKEN] Error getting access token for user with email: ${email}\n`,
      e,
    )
    throw new Error('Failed to get access token for user with email: ' + email)
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/gmail/v1/users/${email}/history?startHistoryId=${historyId}&historyTypes=messageAdded`,
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
        `[MERCURY][GET_HISTORY][GOOGLE_API_ERROR] Error getting historyId ${historyId} for user with email: ${email}\n`,
        error,
      )
      return null
    }

    const history = await response.json()

    console.log('history', history)

    return history
  } catch (e) {
    console.error(
      `[MERCURY][GET_HISTORY][FETCH_ERROR] Error getting historyId ${historyId} for user with email: ${email}\n`,
      e,
    )
    return null
  }
}
