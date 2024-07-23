import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import Link from 'next/link'

export default function UnprotectedNav() {
  return (
    <header className="sticky top-0 z-50 flex h-20 w-full items-center justify-between border-b border-border bg-background/50 px-5 backdrop-blur-lg backdrop-saturate-150">
      <div className="">
        <Link
          href="/"
          className="text-2xl font-semibold transition-all hover:text-primary"
        >
          Ponovo
        </Link>
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
