'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SignUpSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { signUp } from '@/actions/auth/sign-up'
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/constants/auth'

import { FormError } from '../custom/form-error'
import FormSuccess from '../custom/form-success'
import { MirageLoader } from '../custom/loaders'
import { Button } from '../ui/button'
import PasswordInput from '../ui/custom/password-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import ProvidersSection from './providers-section'

export default function RegisterForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const callbackUrl =
    searchParams.get('redirectTo') ?? DEFAULT_LOGIN_REDIRECT_URL

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      callbackUrl: callbackUrl,
    },
  })

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    const response = await signUp(data)

    if (response.error) {
      setError(response.error)
    }
    if (response.success) {
      setSuccess(response.success)
    }

    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button disabled={loading} className="w-full" type="submit">
            {loading ? <MirageLoader /> : 'Register'}
          </Button>
          <ProvidersSection
            loading={loading}
            setLoading={setLoading}
            setError={setError}
            callbackUrl={callbackUrl}
          />
        </div>
      </form>
    </Form>
  )
}
