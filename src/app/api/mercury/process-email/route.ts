import { receiveMessage } from '@/server/mercury/queues/receive-message'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  // authenticate with internal api key
  const apiKey = req.headers.get('x-api-key')
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return new Response('Unauthorized', { status: 401 })
  }

  const body = await req.json()

  await receiveMessage(JSON.stringify(body))

  return new Response('OK', { status: 200 })
}
