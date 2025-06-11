import { Button } from '@/components/ui/button'
import ContactTimelineUpdateFormDialog from './contact-form-dialog'

export default function NewContactTimelineUpdateButton({
  contactId,
}: {
  contactId: string
}) {
  return (
    <ContactTimelineUpdateFormDialog
      contactId={contactId}
      activateButton={<Button>New Contact Timeline Update</Button>}
      editing={false}
    />
  )
}
