'use client'

import { useEffect, useTransition } from 'react'
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
import { Input } from '@/components/ui/input'
import { userPreferenceSchema } from '@/schemas'
import { updateUserPreferences } from '@/actions/user/update-user-preferences'

const UserPreferencesForm = ({
  applicationGoal,
}: {
  applicationGoal: number | undefined | null
}) => {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof userPreferenceSchema>>({
    resolver: zodResolver(userPreferenceSchema),
    defaultValues: {
      applicationGoal: applicationGoal ?? 0,
    },
  })

  const onSubmit = (data: z.infer<typeof userPreferenceSchema>) => {
    startTransition(() => {
      updateUserPreferences(data)
        .then((response) => {
          if (response.success) {
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
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center space-y-4"
      >
        <FormField
          control={form.control}
          name="applicationGoal"
          render={({ field }) => (
            <FormItem>
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
        <Button type="submit" className="w-2/3" disabled={isPending}>
          Save
        </Button>
      </form>
    </Form>
  )
}

export default UserPreferencesForm
