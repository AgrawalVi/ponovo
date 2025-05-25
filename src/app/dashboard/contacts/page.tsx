import { currentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ContactsPage() {
  const user = await currentUser()

  if (!user) {
    redirect('/')
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="bg-gradient-to-b from-foreground from-50% to-neutral-600 bg-clip-text p-4 text-center text-6xl font-semibold text-transparent dark:to-neutral-400">
        Coming Soon
      </h1>
    </div>
  )
}
