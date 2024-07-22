import 'server-only'

import { db } from '@/lib/db'
import { jobApplications } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { getAllJobApplicationsByUserId } from '../job-applications/get-job-applications'

export default async function getApplicationStatusPieChartData(userId: string) {
  const jobApplications = await getAllJobApplicationsByUserId(userId)
}
