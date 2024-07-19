import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import Link from 'next/link'

export default function UnprotectedNav() {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-border bg-background px-5">
      <div className="">
        <Link href="/">Logo</Link>
      </div>
      <div className="flex space-x-4">
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
        <ModeToggle />
      </div>
    </header>
  )
}
