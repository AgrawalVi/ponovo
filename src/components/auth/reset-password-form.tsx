'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ResetPasswordSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { DEFAULT_LOGIN_REDIRECT_URL, LOGIN_ROUTE } from '@/constants/auth'

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
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
import { router } from 'better-auth/api'

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get('token')

  const callbackUrl =
    searchParams.get('redirectTo') ?? DEFAULT_LOGIN_REDIRECT_URL

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
      callbackUrl: callbackUrl,
    },
  })

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    if (!token) {
      toast.error('Invalid Token')
      return
    }
    const { data, error } = await authClient.resetPassword({
      newPassword: values.password,
      token: token,
    })

    if (error) {
      setError('Invalid Token!')
      setLoading(false)
      return
    }

    if (data) {
      toast.success('Password Reset Successfully')
      router.push(LOGIN_ROUTE)
    }

    setLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
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
            {loading ? <MirageLoader /> : 'Reset Password'}
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
