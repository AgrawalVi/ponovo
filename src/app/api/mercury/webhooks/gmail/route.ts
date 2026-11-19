import { getHistory } from '@/server/mercury/gmail/get-history'
import { publishMessage } from '@/server/mercury/queues/publish-message'
import { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  // // authenticate with internal api key
  // const apiKey = req.headers.get('x-api-key')
  // if (apiKey !== process.env.INTERNAL_API_KEY) {
  //   return new Response('Unauthorized', { status: 401 })
  // }

  const body = await req.json()

  console.log('gmail body', body)

  const message = JSON.stringify(body)

  // await publishMessage(message)

  // convert message.message from base64 to json
  const messageJson = JSON.parse(
    Buffer.from(body.message.data, 'base64').toString('utf-8'),
  )

  const history = await getHistory(
    messageJson.emailAddress,
    messageJson.historyId,
  )

  return new Response('OK', { status: 200 })
}
