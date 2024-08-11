'use client'

import { useTransition } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { userPreferenceSchema } from '@/schemas'
import { updateUserPreferences } from '@/actions/user/update-user-preferences'
import { useUser } from '@clerk/nextjs'
import { roleTypeEnum, statusEnum } from '@/types'
import StatusFormElement from './status-form-element'

interface UserPreferencesFormProps {
  applicationGoal?: number
  roleType?: roleTypeEnum
  timelineUpdateType?: statusEnum
}

const UserPreferencesForm = ({
  applicationGoal,
  roleType,
  timelineUpdateType,
}: UserPreferencesFormProps) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  const { user } = useUser()

  const form = useForm<z.infer<typeof userPreferenceSchema>>({
    resolver: zodResolver(userPreferenceSchema),
    defaultValues: {
      applicationGoal: applicationGoal ?? undefined,
      roleType: roleType ?? undefined,
      timelineUpdateType: timelineUpdateType ?? undefined,
    },
  })

  const onSubmit = (data: z.infer<typeof userPreferenceSchema>) => {
    startTransition(() => {
      updateUserPreferences(data)
        .then((response) => {
          if (response.success) {
            toast({ title: 'Application update logged successfully' })
            console.log(user)
            user?.reload()
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
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center space-y-8 sm:w-[25rem]"
          >
            <div className="flex flex-col items-center space-y-4">
              <FormField
                control={form.control}
                name="applicationGoal"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Application Goal</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your Goal"
                        type="number"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      Select a goal for how many jobs you want to apply for
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roleType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Application Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="co-op">Co-Op</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the default role type when adding a new job
                      application
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timelineUpdateType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Application Status</FormLabel>
                    <StatusFormElement
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isPending}
                    />
                    <FormDescription>
                      Select the default timeline update type when adding a new
                      timeline update
                    </FormDescription>
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
      </CardContent>
    </Card>
  )
}

export default UserPreferencesForm
