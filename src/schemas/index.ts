import { applicationStatusEnum, jobRoleTypeEnum } from '@/drizzle/schema'
import { z } from 'zod'

export const newApplicationSchema = z.object({
  companyName: z.string().min(1, { message: 'Company name is required' }),
  jobTitle: z.string().min(1, { message: 'Job title is required' }),
  url: z.string().optional(),
  status: z.enum(applicationStatusEnum.enumValues).default('applied'),
  roleType: z.enum(jobRoleTypeEnum.enumValues).default('internship'),
  appliedDate: z.date(),
})

export const applicationTimelineUpdateSchema = z.object({
  updateType: z.enum(applicationStatusEnum.enumValues),
  updateDate: z.date(),
  comments: z.string().optional(),
})

export const userPreferenceSchema = z.object({
  applicationGoal: z.coerce
    .number()
    .min(0, { message: 'Application goal must be greater than 0' }),
})
