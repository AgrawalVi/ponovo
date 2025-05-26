import AuthCard from '@/components/auth/auth-card'
import { FormError } from '@/components/custom/form-error'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

export default async function VerifyEmailPage() {
  return (
    <AuthCard title="Verify Email" className="w-full max-w-sm">
      <div className="grid gap-4">
        <FormError message={'Invalid Token. Please try again.'} />
        <Link href={'/auth/sign-in'}>
          <Button className="group w-full">
            Go to Login{' '}
            <ChevronRight className="ml-2 size-4 transition-transform group-hover:translate-x-1 group-hover:scale-110" />
          </Button>
        </Link>
      </div>
    </AuthCard>
  )
}
