import getApplicationStatusPieChartData from '@/data/charts/application-status-pie-chart'
import { auth } from '@clerk/nextjs/server'
import { ApplicationStatusPieChart } from './application-status-pie-chart'

export default async function ApplicationStatusPieChartContainer() {
  const user = auth()

  if (!user.userId) {
    return <div>Unauthorized</div>
  }

  const data = await getApplicationStatusPieChartData(user.userId)

  if (!data) {
    return <div>No Applications Found</div>
  }

  return <ApplicationStatusPieChart data={data} />
}
