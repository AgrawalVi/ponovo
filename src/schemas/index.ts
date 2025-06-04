import {
  applicationStatusEnum,
  contactStatusEnum,
  contactTimelineUpdateEnum,
  jobRoleTypeEnum,
} from '@/drizzle/schema'
import { z } from 'zod'

export const applicationSchema = z.object({
  companyName: z.string().min(1, { message: 'Company name is required' }),
  jobTitle: z.string().min(1, { message: 'Job title is required' }),
  url: z.string().url({ message: 'Must be a valid URL' }).or(z.literal('')),
  status: z.enum(applicationStatusEnum.enumValues).default('applied'),
  roleType: z.enum(jobRoleTypeEnum.enumValues).default('internship'),
  appliedDate: z.date(),
  applicationSeasonId: z.string(),
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
  roleType: z.enum(jobRoleTypeEnum.enumValues),
  timelineUpdateType: z.enum(applicationStatusEnum.enumValues),
})

export const savedJobPostSchema = z.object({
  companyName: z.string().min(1, { message: 'Company name is required' }),
  jobTitle: z.string().min(1, { message: 'Job title is required' }),
  url: z.string().url({ message: 'Must be a valid URL' }).or(z.literal('')),
  roleType: z.enum(jobRoleTypeEnum.enumValues).default('internship'),
  addedDate: z.date(),
  applicationSeasonId: z.string(),
})

export const createApplicationSeasonSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().optional(),
  active: z.boolean(),
})

export const editApplicationSeasonSchema = createApplicationSeasonSchema.omit({
  active: true,
})

export const ContactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  companyName: z.string().optional(),
  jobTitle: z.string().optional(),
  contactStatus: z.enum(contactStatusEnum.enumValues).default('contacted'),
  phone: z.string().optional(),
  email: z.string().email({ message: 'Must be a valid email' }).optional(),
  linkedInUrl: z.string().url({ message: 'Must be a valid URL' }).optional(),
  notes: z.string().optional(),
})

export const ContactTimelineUpdateSchema = z.object({
  updateType: z.enum(contactTimelineUpdateEnum.enumValues),
  updateDate: z.date(),
  comments: z.string().optional(),
})
