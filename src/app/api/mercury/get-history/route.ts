import { getHistory } from '@/server/mercury/gmail/get-history'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const history = await getHistory('zvishrut@gmail.com', '13844483')

  return NextResponse.json(history)
}
