import { applicationTableColumns } from '@/components/applications/table/columns'
import { ApplicationDataTable } from '@/components/applications/table/data-table'
import NewApplicationForm from '@/components/forms/new-application'
import Tiptap from '@/components/tiptap'
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

  const jobApplications = userWithJobApplications[0].jobApplications

  return (
    <div className="flex w-full flex-col items-center">
      <NewApplicationForm />
      <ApplicationDataTable
        data={jobApplications}
        columns={applicationTableColumns}
      />
    </div>
  )
}
