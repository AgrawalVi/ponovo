'use client'

import { useEffect, useTransition } from 'react'
import { z } from 'zod'
import { newApplicationSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { dbJobApplication } from '@/types'
import { editApplication } from '@/actions/applications/edit-application'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { api } from '@/trpc/react'
import StatusFormElement from '../status-form-element'

interface ApplicationFormProps {
  application?: dbJobApplication
  setIsChanged: (value: boolean) => void
  setOpen: (value: boolean) => void
}

const ApplicationForm = ({
  application,
  setIsChanged,
  setOpen,
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

  const defaultValues = application
    ? {
        companyName: application.companyName,
        jobTitle: application.jobTitle,
        url: application.url,
        status: application.applicationStatus,
        roleType: application.roleType,
        appliedDate: application.dateApplied,
      }
    : {
        companyName: '',
        jobTitle: '',
        url: '',
        status: 'applied',
      }

  const form = useForm<z.infer<typeof newApplicationSchema>>({
    resolver: zodResolver(newApplicationSchema),
    defaultValues: {
      companyName: application?.companyName ?? '',
      jobTitle: application?.jobTitle ?? '',
      url: application?.url ?? '',
      status: application?.applicationStatus ?? 'applied',
      roleType: application?.roleType ?? 'internship',
      appliedDate: application?.dateApplied ?? new Date(),
    },
  })

  useEffect(() => {
    const subscription = form.watch((values) => {
      if (application) {
        setIsChanged(JSON.stringify(values) !== JSON.stringify(defaultValues))
      } else {
        const { roleType, appliedDate, ...rest } = values
        setIsChanged(JSON.stringify(rest) !== JSON.stringify(defaultValues))
      }
    })
    return () => subscription.unsubscribe()
  }, [form, setIsChanged])

  const onSubmit = (data: z.infer<typeof newApplicationSchema>) => {
    startTransition(() => {
      if (application) {
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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                        disabled={isPending}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
