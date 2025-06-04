import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { contactStatusEnum } from '@/drizzle/schema'

interface ContactStatusFormElement {
  onValueChange: (value: (typeof contactStatusEnum.enumValues)[number]) => void
  value: (typeof contactStatusEnum.enumValues)[number]
  disabled: boolean
}

export default function ContactStatusFormElement({
  onValueChange,
  value,
  disabled,
}: ContactStatusFormElement) {
  return (
    <Select
      onValueChange={onValueChange}
      defaultValue={value}
      disabled={disabled}
    >
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {contactStatusEnum.enumValues.map((status) => (
          <SelectItem key={status} value={status}>
            {status
              .replace(/-/g, ' ')
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
