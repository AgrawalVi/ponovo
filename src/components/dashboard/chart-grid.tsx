import { Suspense } from 'react'
import ApplicationStatusPieChartSkeleton from '../skeletons/charts/application-status-pie-chart-skeleton'
import ApplicationStatusPieChartContainer from './charts/application-status-pie-chart-container'

export default function ChartGrid({
  applicationSeasonId,
}: {
  applicationSeasonId: string
}) {
  return (
    <>
      <Suspense fallback={<ApplicationStatusPieChartSkeleton />}>
        <ApplicationStatusPieChartContainer
          applicationSeasonId={applicationSeasonId}
        />
      </Suspense>
    </>
  )
}
