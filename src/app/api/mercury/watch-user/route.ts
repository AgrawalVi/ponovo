import { accounts } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { setupWatchForUser } from '@/server/mercury/gmail/watch-user'
import { and, eq } from 'drizzle-orm'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  const apiKey = req.headers.get('x-api-key')
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { userId } = await req.json()

  const account = await db.query.accounts.findFirst({
    where: and(eq(accounts.providerId, 'google'), eq(accounts.userId, userId)),
    with: {
      user: true,
    },
  })

  if (!account) {
    return new Response('Account not found', { status: 404 })
  }

  if (!account.user.email || !account.accessToken) {
    return new Response('User email or access token not found', { status: 404 })
  }

  const watchData = await setupWatchForUser({
    userId: account.userId,
    email: account.user.email,
    oauthToken: account.accessToken,
  })

  if (!watchData) {
    return new Response('Failed to watch account', { status: 500 })
  }

  return new Response('Successfully watching account', { status: 200 })
}
