import { applicationTableColumns } from '@/components/applications/table/columns'
import { ApplicationDataTable } from '@/components/applications/table/data-table'
import { getAllJobApplicationsByUserId } from '@/data/job-applications/get-job-applications'
import { users } from '@/drizzle/schema'
import { currentUserId } from '@/lib/auth'
import { db } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

export default async function ApplicationsPage() {
  const userId = await currentUserId()

  if (!userId) {
    redirect('/')
  }

  let jobApplications
  try {
    jobApplications = await getAllJobApplicationsByUserId(userId)
  } catch (e) {
    console.error(e)
    throw new Error('Database failed to get job applications')
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-3 bg-gradient-to-b from-foreground from-50% to-neutral-600 bg-clip-text pt-2 text-center text-5xl font-semibold text-transparent dark:to-neutral-400">
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
