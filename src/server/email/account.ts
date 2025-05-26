import { resend } from '@/lib/resend'

const accountVerificationEmail = async (email: string, token: string) => {
  const { data, error } = await resend.emails.send({
    from: 'Ponovo Accounts <accounts@ponovo.app>',
    to: email,
    subject: 'Ponovo - Verify your email',
    text: 'Please verify your email address',
  })
}
