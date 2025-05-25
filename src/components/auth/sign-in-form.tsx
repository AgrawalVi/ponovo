'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { SignInSchema } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { signIn } from '@/actions/auth/sign-in'
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/constants/auth'

import { FormError } from '../custom/form-error'
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
import { Label } from '../ui/label'
import ProvidersSection from './providers-section'

export default function SignInForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const callbackUrl =
    searchParams.get('redirectTo') ?? DEFAULT_LOGIN_REDIRECT_URL

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
      callbackUrl: callbackUrl,
    },
  })

  const onEmailSubmit = async (data: z.infer<typeof SignInSchema>) => {
    setLoading(true)
    setError(null)
    const response = await signIn(data)

    if (response.error) {
      setError(response.error)
    }

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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="underline-offset-2 hover:underline"
                  >
                    <Label className="text-xs hover:cursor-pointer">
                      Forgot password?
                    </Label>
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput {...field} disabled={loading} />
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
            {loading ? <MirageLoader /> : 'Login'}
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
