import { applicationTableColumns } from '@/components/applications/table/columns'
import { ApplicationDataTable } from '@/components/applications/table/data-table'
import { users } from '@/drizzle/schema'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export default async function ApplicationsPage() {
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
      <div className="my-10 bg-gradient-to-b from-foreground from-50% to-neutral-600 bg-clip-text pt-2 text-center text-6xl font-semibold text-transparent dark:to-neutral-400">
        Your Job Applications
      </div>
      <div className="w-full place-items-center overflow-x-auto">
        <ApplicationDataTable
          data={jobApplications}
          columns={applicationTableColumns}
        />
      </div>
    </div>
  )
}
