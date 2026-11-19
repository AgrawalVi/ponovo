import { getPubSubClient } from '@/lib/pubsub'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Authenticate with internal API key for security
    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== process.env.INTERNAL_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { subscriptionName, ackId, ackIds } = body

    if (!subscriptionName) {
      return NextResponse.json(
        { error: 'subscriptionName is required' },
        { status: 400 },
      )
    }

    if (!ackId && !ackIds) {
      return NextResponse.json(
        { error: 'Either ackId or ackIds array is required' },
        { status: 400 },
      )
    }

    const pubsubClient = getPubSubClient()

    if (ackIds && Array.isArray(ackIds)) {
      // Acknowledge multiple messages
      await pubsubClient.ackMessages(subscriptionName, ackIds)
      return NextResponse.json({
        success: true,
        message: `${ackIds.length} messages acknowledged`,
        acknowledgedCount: ackIds.length,
      })
    } else if (ackId) {
      // Acknowledge single message
      await pubsubClient.ackMessage(subscriptionName, ackId)
      return NextResponse.json({
        success: true,
        message: 'Message acknowledged',
        ackId,
      })
    }

    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 },
    )
  } catch (error) {
    console.error('Error acknowledging Pub/Sub message:', error)
    return NextResponse.json(
      {
        error: 'Failed to acknowledge message',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
