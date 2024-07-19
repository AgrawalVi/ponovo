import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Skeleton } from '@/components/ui/skeleton'
import { ClerkLoading, SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function UnprotectedNav() {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-border bg-background px-5">
      <div className="">
        <Link href="/">Logo</Link>
      </div>
      <div className="flex items-center space-x-4">
        <ClerkLoading>
          <Skeleton className="h-7 w-7 rounded-full" />
        </ClerkLoading>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
    </header>
  )
}
