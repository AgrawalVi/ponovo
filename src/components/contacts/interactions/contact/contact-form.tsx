'use client'

import { createContact } from '@/actions/contacts/contact/create-contact'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { handleServerActionResponseForm } from '@/lib/utils'
import { ContactSchema } from '@/schemas'
import { dbContact, dbCreateContactType, ServerActionResponse } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import ContactStatusFormElement from '../contact-status-form-element'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ContactFormPropsEditing {
  contact: dbContact // required when editing is true
  setIsChanged: (value: boolean) => void
  setOpen: (value: boolean) => void
  editing: true // Discriminator field
}

interface ContactFormPropsNotEditing {
  contact?: dbCreateContactType // optional when editing is true
  setIsChanged: (value: boolean) => void
  setOpen: (value: boolean) => void
  editing: false // Discriminator field
}

type ContactFormProps = ContactFormPropsEditing | ContactFormPropsNotEditing

const ContactForm = ({
  contact,
  setIsChanged,
  setOpen,
  editing,
}: ContactFormProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const queryKey = undefined

  const defaultValues = useMemo(
    () => ({
      name: contact?.name ?? '',
      companyName: contact?.company ?? '',
      jobTitle: contact?.jobTitle ?? '',
      contactStatus: contact?.contactStatus ?? 'contacted',
      phone: contact?.phone ?? '',
      email: contact?.email ?? '',
      linkedInUrl: contact?.linkedInUrl ?? '',
      notes: contact?.notes ?? '',
    }),
    [contact],
  )

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
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

  const onSubmit = async (data: z.infer<typeof ContactSchema>) => {
    setIsLoading(true)
    let response: ServerActionResponse
    if (editing) {
      // TODO: implement this
      setIsLoading(false)
      return
    } else {
      response = await createContact(data)
    }
    handleServerActionResponseForm(response, setOpen, router, {
      queryKey,
      queryClient,
    })
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="grid gap-2 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Status</FormLabel>
                <FormControl>
                  <ContactStatusFormElement
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="123-456-7890"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedInUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn URL</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="in/vishrut-agrawal"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="zvishrut@gmail.com"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Notes..."
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mx-auto w-2/3" disabled={isLoading}>
          Save
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm
