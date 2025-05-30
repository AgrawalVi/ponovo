import { AccessTokenWithUserInfo } from '@/types/mercury'
import { getAccessToken } from '../helpers/google/get-access-token'
import { MERCURY_GMAIL_TOPIC_NAME } from '@/constants/mercury'
import { WatchRequest } from '@/types/google/watch'

export const watchUser = async (email: string) => {
  let tokenWithUserInfo: AccessTokenWithUserInfo

  try {
    tokenWithUserInfo = await getAccessToken(email)
  } catch (e) {
    console.error(
      `[MERCURY][WATCH_USER][GET_ACCESS_TOKEN] Error getting access token for user with email: ${email}\n`,
      e,
    )
    throw new Error('Failed to get access token for user with email: ' + email)
  }

  const watchRequest: WatchRequest = {
    topicName: MERCURY_GMAIL_TOPIC_NAME,
    labelIds: ['INBOX'],
    labelFilterBehavior: 'INCLUDE',
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/gmail/v1/users/${email}/watch`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenWithUserInfo.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(watchRequest),
      },
    )
    if (!response.ok) {
      const error = await response.json()
      console.error(
        `[MERCURY][WATCH_USER][GOOGLE_API_ERROR] Failed to setup watch for user with email: ${email}\n`,
        error,
      )
      return null
    }
    const watchData = await response.json()

    return watchData
  } catch (error) {
    console.error(
      `[MERCURY][WATCH_USER][FETCH_ERROR] Error setting up watch for user with email: ${email}\n`,
      error,
    )
    return null
  }
}
