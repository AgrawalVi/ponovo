'use client'

import { useEffect, useTransition } from 'react'
import { z } from 'zod'
import { applicationTimelineUpdateSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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
import { dbJobApplicationTimelineUpdate } from '@/types'
import { Textarea } from '@/components/ui/textarea'
import editTimelineUpdate from '@/actions/timeline-updates/edit-timeline-update'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { api } from '@/trpc/react'
import { newTimelineUpdate } from '@/actions/timeline-updates/new-timeline-update'
import StatusFormElement from '../status-form-element'

interface TimelineUpdateFormProps {
  timelineUpdate?: dbJobApplicationTimelineUpdate
  setIsChanged: (value: boolean) => void
  setOpen: (value: boolean) => void
  applicationId: string
}

const TimelineUpdateForm = ({
  timelineUpdate,
  setIsChanged,
  setOpen,
  applicationId,
}: TimelineUpdateFormProps) => {
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  let queryKey = undefined
  if (timelineUpdate) {
    queryKey = getQueryKey(api.timeLineUpdates.getAllByApplicationId, {
      id: timelineUpdate.jobApplicationId,
    })
  }

  const defaultValues = timelineUpdate
    ? {
        updateType: timelineUpdate.timeLineUpdate,
        updateDate: timelineUpdate.timelineUpdateReceivedAt,
        comments: timelineUpdate.comments,
      }
    : {
        comments: '',
      }

  const form = useForm<z.infer<typeof applicationTimelineUpdateSchema>>({
    resolver: zodResolver(applicationTimelineUpdateSchema),
    defaultValues: {
      updateType: timelineUpdate?.timeLineUpdate ?? 'rejected',
      updateDate: timelineUpdate?.timelineUpdateReceivedAt ?? new Date(),
      comments: timelineUpdate?.comments ?? '',
    },
  })

  useEffect(() => {
    const subscription = form.watch((values) => {
      setIsChanged(JSON.stringify(values) !== JSON.stringify(defaultValues))
    })
    return () => subscription.unsubscribe()
  }, [form, setIsChanged])

  const onSubmit = (data: z.infer<typeof applicationTimelineUpdateSchema>) => {
    startTransition(() => {
      if (timelineUpdate) {
        editTimelineUpdate(
          data,
          timelineUpdate.id,
          timelineUpdate.jobApplicationId,
        )
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
        newTimelineUpdate(data, applicationId)
          .then((response) => {
            if (response.success) {
              form.reset()
              queryClient.invalidateQueries({
                queryKey,
              })
              setOpen(false)
              toast({ title: 'Application update logged successfully' })
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
            name="updateType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Update Type</FormLabel>
                <StatusFormElement
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
            name="updateDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Update Date</FormLabel>
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
        </div>
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Comments</FormLabel>
              <Textarea {...field} disabled={isPending} />
              <FormDescription>
                Any additional info you want to add
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-2/3" disabled={isPending}>
          Save
        </Button>
      </form>
    </Form>
  )
}

export default TimelineUpdateForm
