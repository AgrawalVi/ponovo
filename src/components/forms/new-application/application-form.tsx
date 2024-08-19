'use client'

import { useEffect, useTransition } from 'react'
import { z } from 'zod'
import { applicationSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newApplication } from '@/actions/applications/new-application'

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { dbJobApplication, roleTypeEnum } from '@/types'
import { editApplication } from '@/actions/applications/edit-application'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { api } from '@/trpc/react'
import StatusFormElement from '../status-form-element'
import DatePickerFormElement from "@/components/forms/date-picker-form-element";

interface ApplicationFormPropsEditing {
  application: dbJobApplication; // Required when editing is true
  setIsChanged: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  editing: true;  // Discriminator field
  roleType?: roleTypeEnum;
}

interface ApplicationFormPropsNotEditing {
  application?: dbJobApplication; // Optional when editing is false
  setIsChanged: (value: boolean) => void;
  setOpen: (value: boolean) => void;
  editing: false; // Discriminator field
  roleType?: roleTypeEnum;
}

type ApplicationFormProps = ApplicationFormPropsEditing | ApplicationFormPropsNotEditing;

const ApplicationForm = ({
  application,
  setIsChanged,
  setOpen,
  editing,
  roleType,
}: ApplicationFormProps) => {
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  let queryKey = undefined
  if (application) {
    queryKey = getQueryKey(api.timeLineUpdates.getAllByApplicationId, {
      id: application.id,
    })
  }

  const defaultValues = {
        companyName: application?.companyName ?? '',
        jobTitle: application?.jobTitle ?? '',
        url: application?.url ?? undefined,
        status: application?.applicationStatus ?? 'applied',
        roleType: application?.roleType ?? roleType ?? 'internship',
        appliedDate: application?.dateApplied ?? new Date(),
      }

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      companyName: application?.companyName ?? '',
      jobTitle: application?.jobTitle ?? '',
      url: application?.url ?? undefined,
      status: application?.applicationStatus ?? 'applied',
      roleType: application?.roleType ?? roleType ?? 'internship',
      appliedDate: application?.dateApplied ?? new Date(),
    },
  })

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (editing) {
        setIsChanged(JSON.stringify(values) !== JSON.stringify(defaultValues))
      } else {
        const { appliedDate, ...rest } = values
        setIsChanged(JSON.stringify(rest) !== JSON.stringify(defaultValues))
      }
    })
    return () => subscription.unsubscribe()
  }, [form, setIsChanged])

  const onSubmit = (data: z.infer<typeof applicationSchema>) => {
    startTransition(() => {
      if (editing) {
        editApplication(data, application.id)
          .then((response) => {
            if (response.success) {
              form.reset()
              setOpen(false)
              queryClient.invalidateQueries({
                queryKey,
              })
              toast({ title: 'Application edited successfully' })
            } else {
              toast({
                title: 'Something went wrong!',
                description: response.error,
                variant: 'destructive',
              })
            }
          })
          .catch(() => {
            toast({
              title: 'Something went wrong!',
              description: 'An unknown error has occurred',
              variant: 'destructive',
            })
          })
      } else {
        newApplication(data)
          .then((response) => {
            if (response.success) {
              form.reset()
              setOpen(false)
              toast({ title: 'Application logged successfully' })
            } else {
              toast({
                title: 'Something went wrong!',
                description: response.error,
                variant: 'destructive',
              })
            }
          })
          .catch(() => {
            toast({
              title: 'Something went wrong!',
              description: 'An unknown error has occurred',
              variant: 'destructive',
            })
          })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center space-y-4"
      >
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="XYZ Inc"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Software Engineer"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Post URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="vishrut.tech"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appliedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Applied</FormLabel>
                <DatePickerFormElement
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isPending}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="co-op">Co-Op</SelectItem>
                    <SelectItem value="full-time">Full Time</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Application Status</FormLabel>
                <StatusFormElement
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isPending}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-2/3" disabled={isPending}>
          Save
        </Button>
      </form>
    </Form>
  )
}

export default ApplicationForm
