import AuthCard from '@/components/auth/auth-card'
import SignUpForm from '@/components/auth/sign-up-form'
import { MirageLoader } from '@/components/custom/loaders'
import { Suspense } from 'react'

export default function Register() {
  return (
    <Suspense fallback={<MirageLoader />}>
      <AuthCard
        title="Register"
        description="Create an account to get started"
        className="w-full max-w-sm"
        backUrl={{
          label: 'Already have an account?',
          href: '/auth/sign-in',
        }}
      >
        <SignUpForm />
      </AuthCard>
    </Suspense>
  )
}
