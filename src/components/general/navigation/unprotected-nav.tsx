import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function UnprotectedNav() {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-border bg-background px-5">
      <div className=""></div>
      <div>
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </div>
    </header>
  )
}
