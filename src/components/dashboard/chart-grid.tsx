import { Suspense } from 'react'
import ApplicationStatusPieChartContainer from './charts/application-status-pie-chart-container'

export default function ChartGrid() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplicationStatusPieChartContainer />
    </Suspense>
  )
}
