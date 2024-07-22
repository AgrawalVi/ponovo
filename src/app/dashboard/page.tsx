import ChartGrid from '@/components/dashboard/chart-grid'
import { users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const user = auth()
  if (!user.userId) {
    redirect('/')
  }

  const userWithJobApplications = await db.query.users.findMany({
    with: {
      jobApplications: true,
    },
    where: eq(users.clerkId, user.userId),
  })

  if (userWithJobApplications.length !== 1) {
    redirect('/')
  }

  const jobApplications = userWithJobApplications[0].jobApplications

  return (
    <div className="flex w-full flex-col items-center">
      <div className="my-10 bg-gradient-to-b from-foreground from-50% to-neutral-600 bg-clip-text pt-2 text-6xl font-semibold text-transparent dark:to-neutral-400">
        Dashboard
      </div>
      <div>
        <ChartGrid />
      </div>
    </div>
  )
}
