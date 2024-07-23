import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <SignUp />
    </div>
  )
}
