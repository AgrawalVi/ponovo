import getApplicationStatusPieChartData from '@/data/charts/application-status-pie-chart'
import { ApplicationStatusPieChart } from './application-status-pie-chart'
import ApplicationStatusPieChartSkeleton from '@/components/skeletons/charts/application-status-pie-chart-skeleton'
import { currentUserId } from '@/lib/auth'

export default async function ApplicationStatusPieChartContainer({
  applicationSeasonId,
}: {
  applicationSeasonId: string
}) {
  const userId = await currentUserId()

  if (!userId) {
    return <div>Unauthorized</div>
  }

  const data = await getApplicationStatusPieChartData(
    userId,
    applicationSeasonId,
  )

  if (!data) {
    return (
      <ApplicationStatusPieChartSkeleton placeholderText="No Applications Found" />
    )
  }

  return <ApplicationStatusPieChart data={data} />
}
