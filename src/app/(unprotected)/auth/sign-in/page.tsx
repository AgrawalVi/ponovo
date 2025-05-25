import AuthCard from '@/components/auth/auth-card'
import SignInForm from '@/components/auth/sign-in-form'

export default function LoginPage() {
  return (
    <AuthCard
      title="Login"
      description="Login to your account"
      className="w-full max-w-sm"
      backUrl={{
        label: 'Dont have an account?',
        href: '/auth/sign-up',
      }}
    >
      <SignInForm />
    </AuthCard>
  )
}
