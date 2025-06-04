import ApplicationsTable from '@/components/applications/applications-table'
import ContactsTable from '@/components/contacts/contacts-table'
import { getAllContactsByUserId } from '@/data/contacts/contacts/get-contact'
import { getAllJobApplicationsByUserIdAndApplicationSeasonId } from '@/data/job-applications/get-job-applications'
import { applicationSeasonGuard, currentUserId } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function ContactsPage() {
  const userId = await currentUserId()

  if (!userId) {
    redirect('/')
  }

  let contacts
  try {
    contacts = await getAllContactsByUserId(userId)
  } catch (e) {
    console.error(e)
    throw new Error('Database failed to get contacts')
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-3 bg-gradient-to-b from-foreground from-50% to-neutral-600 bg-clip-text pt-2 text-center text-5xl font-semibold text-transparent dark:to-neutral-400">
        Your Contacts
      </div>
      <div className="w-full place-items-center">
        <ContactsTable data={contacts} />
      </div>
    </div>
  )
}
