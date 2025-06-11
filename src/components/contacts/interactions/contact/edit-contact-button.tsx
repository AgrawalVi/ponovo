import { dbContact } from '@/types'
import ContactFormDialog from './contact-form-dialog'
import { Button } from '@/components/ui/button'
import { PencilIcon } from 'lucide-react'

export default function EditContactButton({ contact }: { contact: dbContact }) {
  return (
    <ContactFormDialog
      editing={true}
      contact={contact}
      activateButton={
        <Button variant="ghost" className="border border-dashed" size="icon">
          <span className="flex h-full w-full items-center justify-center">
            <PencilIcon size="20" />
          </span>
        </Button>
      }
    />
  )
}
