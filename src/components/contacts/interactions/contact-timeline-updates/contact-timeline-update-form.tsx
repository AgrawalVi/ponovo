'use client'

import { useEffect, useMemo, useState } from 'react'
import { z } from 'zod'
import { ContactTimelineUpdateSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { dbContactTimelineUpdate, ServerActionResponse } from '@/types'
import { Textarea } from '@/components/ui/textarea'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { api } from '@/trpc/react'
import DatePickerFormElement from '@/components/forms/date-picker-form-element'
import ContactStatusFormElement from '../contact-status-form-element'
import { newContactTimelineUpdate } from '@/actions/contacts/contact-timeline-update/create-contact-timeline-update'
import { handleServerActionResponseForm } from '@/lib/utils'
import { editContactTimelineUpdate } from '@/actions/contacts/contact-timeline-update/edit-contact-timeline-update'

interface ContactTimelineUpdateFormPropsEditing {
  timelineUpdate: dbContactTimelineUpdate
  setIsChanged: (value: boolean) => void
  setOpen: (value: boolean) => void
  editing: true
  contactId: string
}

interface ContactTimelineUpdateFormPropsNotEditing {
  timelineUpdate?: dbContactTimelineUpdate
  setIsChanged: (value: boolean) => void
  setOpen: (value: boolean) => void
  editing: false
  contactId: string
}

type ContactTimelineUpdateFormProps =
  | ContactTimelineUpdateFormPropsEditing
  | ContactTimelineUpdateFormPropsNotEditing

const ContactTimelineUpdateForm = ({
  timelineUpdate,
  setIsChanged,
  setOpen,
  editing,
  contactId,
}: ContactTimelineUpdateFormProps) => {
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const queryKey = getQueryKey(
    api.contact.contactTimelineUpdates.getAllByContactId,
    {
      id: contactId,
    },
  )

  const defaultValues = useMemo(
    () => ({
      updateType: timelineUpdate?.updateType ?? 'ghosted',
      updateDate: timelineUpdate?.updateDate ?? new Date(),
      comments: timelineUpdate?.comments ?? '',
    }),
    [timelineUpdate],
  )

  const form = useForm<z.infer<typeof ContactTimelineUpdateSchema>>({
    resolver: zodResolver(ContactTimelineUpdateSchema),
    defaultValues,
  })

  useEffect(() => {
    const subscription = form.watch((values) => {
      setIsChanged(JSON.stringify(values) !== JSON.stringify(defaultValues))
    })
    return () => subscription.unsubscribe()
  }, [form, setIsChanged])

  const onSubmit = async (
    data: z.infer<typeof ContactTimelineUpdateSchema>,
  ) => {
    setLoading(true)
    let response: ServerActionResponse
    if (editing) {
      response = await editContactTimelineUpdate(
        data,
        timelineUpdate.id,
        contactId,
      )
    } else {
      response = await newContactTimelineUpdate(data, contactId)
    }
    handleServerActionResponseForm(response, setOpen, undefined, {
      queryKey,
      queryClient,
    })
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="updateType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Update Type</FormLabel>
                <ContactStatusFormElement
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading}
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
                <DatePickerFormElement
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loading}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Comments</FormLabel>
              <Textarea {...field} disabled={loading} />
              <FormDescription>
                Any additional info you want to add
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mx-auto w-2/3" disabled={loading}>
          Save
        </Button>
      </form>
    </Form>
  )
}

export default ContactTimelineUpdateForm
