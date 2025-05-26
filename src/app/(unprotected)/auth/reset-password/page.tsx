import AuthCard from '@/components/auth/auth-card'
import ResetPasswordForm from '@/components/auth/reset-password-form'
import { MirageLoader } from '@/components/custom/loaders'
import { Suspense } from 'react'

export default function LoginPage() {
  return (
    <Suspense fallback={<MirageLoader />}>
      <AuthCard
        title="Reset Password"
        description="Enter your new password below"
        className="w-full max-w-sm"
        backUrl={{
          label: 'Back to Login',
          href: '/auth/sign-in',
        }}
      >
        <ResetPasswordForm />
      </AuthCard>
    </Suspense>
  )
}
