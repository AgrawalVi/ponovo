import getApplicationStatusPieChartData from '@/data/charts/application-status-pie-chart'
import { auth } from '@clerk/nextjs/server'
import { ApplicationStatusPieChart } from './application-status-pie-chart'
import ApplicationStatusPieChartSkeleton from '@/components/skeletons/charts/application-status-pie-chart-skeleton'

export default async function ApplicationStatusPieChartContainer() {
  const user = auth()

  if (!user.userId) {
    return <div>Unauthorized</div>
  }

  const data = await getApplicationStatusPieChartData(user.userId)

  if (!data) {
    return (
      <ApplicationStatusPieChartSkeleton placeholderText="No Applications Found" />
    )
  }

  return <ApplicationStatusPieChart data={data} />
}
