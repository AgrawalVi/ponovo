'use server'

import { auth } from '@/auth'
import { SignUpSchema } from '@/schemas/auth'
import { APIError } from 'better-auth/api'
import { z } from 'zod'

export const signUp = async (data: z.infer<typeof SignUpSchema>) => {
  const validatedFields = SignUpSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { name, email, password, confirmPassword, callbackUrl } =
    validatedFields.data

  // unnecessary but making it verbose (validated in Zod schema)
  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  try {
    await auth.api.signUpEmail({
      body: { name, email, password, callbackURL: callbackUrl },
    })
  } catch (error) {
    console.error(error)
    if (error instanceof APIError) {
      if (error.statusCode === 409) {
        return { error: 'User already exists, please login' }
      }
    }
    console.error('[register] Unknown Error Occurred', error)
    return { error: 'Something went wrong' }
  }

  return { success: 'Please verify your email' }
}
