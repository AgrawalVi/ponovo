'use client'

import { createApplicationSeason } from '@/actions/application-seasons/create-application-season'
import { handleServerActionResponseForm } from '@/lib/utils'
import { createApplicationSeasonSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Switch } from '../ui/switch'

interface CreateApplicationSeasonFormProps {
  setIsChanged: (isChanged: boolean) => void
  setOpen: (open: boolean) => void
}

export default function CreateApplicationSeasonForm({
  setIsChanged,
  setOpen,
}: CreateApplicationSeasonFormProps) {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const defaultValues = useMemo(
    () => ({
      name: '',
      description: undefined,
      active: true,
    }),
    [],
  )

  const form = useForm<z.infer<typeof createApplicationSeasonSchema>>({
    resolver: zodResolver(createApplicationSeasonSchema),
    defaultValues,
  })

  // useEffect to detect changes in the form
  useEffect(() => {
    setIsChanged(false)
    const subscription = form.watch((values) => {
      setIsChanged(JSON.stringify(values) !== JSON.stringify(defaultValues))
    })
    return () => subscription.unsubscribe()
  }, [form, defaultValues, setIsChanged])

  const onSubmit = async (
    values: z.infer<typeof createApplicationSeasonSchema>,
  ) => {
    setLoading(true)
    const response = await createApplicationSeason(values, pathname)
    handleServerActionResponseForm(response, setOpen, router)
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active</FormLabel>
                  <FormDescription>
                    Whether the application season is active after creation.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Form>
  )
}
