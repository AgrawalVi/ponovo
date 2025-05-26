import AuthCard from '@/components/auth/auth-card'
import ForgotPasswordForm from '@/components/auth/forgot-password-form'
import { MirageLoader } from '@/components/custom/loaders'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <Suspense fallback={<MirageLoader />}>
      <AuthCard
        title="Forgot Password"
        description="Enter your email to reset your password"
        className="w-full max-w-sm"
        backUrl={{
          label: 'Back to Login',
          href: '/auth/sign-in',
        }}
      >
        <ForgotPasswordForm />
      </AuthCard>
    </Suspense>
  )
}
