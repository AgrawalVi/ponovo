import { applicationTableColumns } from '@/components/applications/table/columns'
import { ApplicationDataTable } from '@/components/applications/table/data-table'
import { getAllJobApplicationsByUserIdAndApplicationSeasonId } from '@/data/job-applications/get-job-applications'
import { applicationSeasonGuard } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ApplicationsPage({
  params,
}: {
  params: Promise<{ applicationSeasonId: string }>
}) {
  const { applicationSeasonId } = await params

  const guardResponse = await applicationSeasonGuard(
    applicationSeasonId,
    '/dashboard/applications',
  )

  if (guardResponse.redirect) {
    redirect(guardResponse.redirect)
  }

  if (!guardResponse.userId) {
    redirect('/')
  }

  let jobApplications
  try {
    jobApplications = await getAllJobApplicationsByUserIdAndApplicationSeasonId(
      guardResponse.userId,
      applicationSeasonId,
    )
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
          applicationSeasonId={applicationSeasonId}
        />
      </div>
    </div>
  )
}
