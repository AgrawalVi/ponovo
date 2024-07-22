import 'server-only'

import { getAllJobApplicationsByUserId } from '../job-applications/get-job-applications'

export default async function getApplicationStatusPieChartData(userId: string) {
  const jobApplications = await getAllJobApplicationsByUserId(userId)
}
