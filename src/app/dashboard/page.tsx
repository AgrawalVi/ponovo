import ChartGrid from '@/components/dashboard/chart-grid'
import { Button } from '@/components/ui/button'
import { users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = auth()
  if (!user.userId) {
    redirect('/')
  }

  return (
    <div className="flex w-full flex-col items-center space-y-8">
      <div className="mb-2 mt-10 bg-gradient-to-b from-foreground from-50% to-neutral-600 bg-clip-text pt-2 text-6xl font-semibold text-transparent dark:to-neutral-400">
        Dashboard
      </div>
      <div>
        <ChartGrid />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <div className="text-center text-xl">
          While waiting for more charts to be added, start logging some
          applications
        </div>
        <Link href="/dashboard/applications">
          <Button>Log Applications</Button>
        </Link>
      </div>
    </div>
  )
}
