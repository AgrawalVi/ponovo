import { resend } from '@/lib/resend'
import EmailVerification from '@/emails/accounts/verify-email'
import ResetPassword from '@/emails/accounts/reset-password'

export const sendEmailVerificationEmail = async (
  email: string,
  firstName: string,
  url: string,
) => {
  await resend.emails.send({
    from: 'Ponovo | Accounts <accounts@ponovo.app>',
    to: email,
    subject: 'Verify your email',
    react: EmailVerification({ name: firstName, url }),
  })
}

export const sendForgotPasswordEmail = async (
  email: string,
  firstName: string,
  url: string,
) => {
  await resend.emails.send({
    from: 'Ponovo | Accounts <accounts@ponovo.app>',
    to: email,
    subject: 'Reset your password',
    react: ResetPassword({ name: firstName, url }),
  })
}
