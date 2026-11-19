import { getHistory } from '@/server/mercury/gmail/get-history'
import { getThread } from '@/server/mercury/gmail/get-thread'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const thread = await getThread('zvishrut@gmail.com', '1971aa6d9ffffd86')

  return NextResponse.json(thread)
}
