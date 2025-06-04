import { Button } from '@/components/ui/button'
import ContactFormDialog from './contact-form-dialog'

export default function NewContactButton() {
  return (
    <ContactFormDialog
      activateButton={<Button>New Contact</Button>}
      editing={false}
    />
  )
}
