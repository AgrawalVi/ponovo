import { Button } from '@/components/ui/button'
import ContactTimelineUpdateFormDialog from './contact-form-dialog'
import { Plus } from 'lucide-react'

export default function NewContactTimelineUpdateButton({
  contactId,
}: {
  contactId: string
}) {
  return (
    <ContactTimelineUpdateFormDialog
      contactId={contactId}
      activateButton={
        <Button className="sm:w-32 lg:w-12 xl:w-32" size="icon">
          <Plus />
        </Button>
      }
      editing={false}
    />
  )
}
