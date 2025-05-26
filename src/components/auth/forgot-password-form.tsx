'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ForgotPasswordSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  DEFAULT_LOGIN_REDIRECT_URL,
  RESET_PASSWORD_ROUTE,
} from '@/constants/auth'

import { FormError } from '../custom/form-error'
import { MirageLoader } from '../custom/loaders'
import { Button } from '../ui/button'
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
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export default function SignInForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const callbackUrl =
    searchParams.get('redirectTo') ?? DEFAULT_LOGIN_REDIRECT_URL

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onEmailSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    setLoading(true)
    setError(null)

    await authClient.forgetPassword({
      email: data.email,
      redirectTo: RESET_PASSWORD_ROUTE,
    })

    toast.success('Reset link sent to your email')

    setLoading(false)
  }

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled={loading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          {error && <FormError message={error} />}
          <Button
            onClick={form.handleSubmit(onEmailSubmit)}
            disabled={loading}
            className="w-full"
          >
            {loading ? <MirageLoader /> : 'Send Reset Link'}
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
