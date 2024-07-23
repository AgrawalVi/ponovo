import { Suspense } from 'react'
import ApplicationStatusPieChartSkeleton from '../skeletons/charts/application-status-pie-chart-skeleton'
import ApplicationStatusPieChartContainer from './charts/application-status-pie-chart-container'

export default function ChartGrid() {
  return (
    <>
      <Suspense fallback={<ApplicationStatusPieChartSkeleton />}>
        <ApplicationStatusPieChartContainer />
      </Suspense>
    </>
  )
}
