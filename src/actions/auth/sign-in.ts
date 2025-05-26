'use server'

import { auth } from '@/auth'
import { SignInSchema } from '@/schemas/auth'
import { APIError } from 'better-auth/api'
import { z } from 'zod'

import { DEFAULT_LOGIN_REDIRECT_URL } from '@/constants/auth'
import { redirect } from 'next/navigation'

export const signIn = async (data: z.infer<typeof SignInSchema>) => {
  const validatedFields = SignInSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password, callbackUrl } = validatedFields.data

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: callbackUrl ?? DEFAULT_LOGIN_REDIRECT_URL,
      },
    })
  } catch (error) {
    console.error(error)
    if (error instanceof APIError) {
      if (error.statusCode === 401) {
        return { error: 'Invalid credentials' }
      }
      if (error.statusCode === 403) {
        return { error: 'Please verify your email address' }
      }
    }
    console.error('[login] Unknown Error Occurred', error)
    return { error: 'Something went wrong' }
  }

  redirect(callbackUrl ?? DEFAULT_LOGIN_REDIRECT_URL)
}
