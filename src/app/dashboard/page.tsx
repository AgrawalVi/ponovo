import { applicationTableColumns } from '@/components/applications/table/columns'
import { ApplicationDataTable } from '@/components/applications/table/data-table'
import FullApplicationView from '@/components/applications/table/full-application-view'
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

  console.log('render')

  const userWithJobApplications = await db.query.users.findMany({
    with: {
      jobApplications: true,
    },
    where: eq(users.clerkId, user.userId),
  })

  const jobApplications = userWithJobApplications[0].jobApplications

  return (
    <div className="flex w-full flex-col items-center">
      <ApplicationDataTable
        data={jobApplications}
        columns={applicationTableColumns}
      />
      <FullApplicationView applicationId={8} />
    </div>
  )
}
